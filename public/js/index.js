let socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});


socket.on('disconnect', function () {
    console.log('Disconnected from the server');
});

socket.on('newMessage', function(message) {
    console.log('newMessage: ', message);
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

$('#messageForm').on('submit', function(event) {
    event.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {

    });
});