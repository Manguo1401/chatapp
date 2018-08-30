let socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});


socket.on('disconnect', function () {
    console.log('Disconnected from the server');
});

socket.on('newMessage', function(message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let li = $('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let li = $('<li></li>');
    let a = $('<a target="_blank" >My current location</a>');

    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);

    li.append(a);
    $('#messages').append(li);
});

$('#messageForm').on('submit', function(event) {
    event.preventDefault();

    let messageTextbox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {
        messageTextbox.val('');
    });
});

let locationButton = $('#sendLocation');

locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending ...');
    
    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
    }, function(err) {
        locationButton.removeAttr('disabled').text('Send location');
        console.log(err);
        alert('Unable to fetch location.');
    }, {
        timeout: 3000,
        enableHighAccuracy: true, 
        maximumAge: 75000
    });
});