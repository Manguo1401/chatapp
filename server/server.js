require('./config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const port = process.env.PORT;
const publicPath = path.join(__dirname, '../public');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined the chat room'));

    socket.on('createMessage', (message, callback) => {
        console.log('create message', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log('App listening on port: ', port);
});