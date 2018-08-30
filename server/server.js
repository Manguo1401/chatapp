require('./config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT;
const publicPath = path.join(__dirname, '../public');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    
    socket.on('join', (params, callback) => {
        if ( !isRealString(params.name) || !isRealString(params.room) ) {
            return callback('name and room name are required');
        }
        
        socket.join(params.room);
        // socket.leave(params.room);

        users.removeUser(socket.id); //Removes the user from any other chat room he was in before
        users.addUser(socket.id, params.name, params.room);
        
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Room', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Room', `${params.name} has joined the room`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('create message', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lng));
    })

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Room', `${user.name} has left`));
        }
    });
});

server.listen(port, () => {
    console.log('App listening on port: ', port);
});