let socket = io();

function scrollToBottom() {
    // SELECTORS
    let messages = $('#messages');
    let newMessage = messages.children('li:last-child');
    // HEIGHTS
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    let params = $.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = "/";
        } else {
            console.log('No error');
        }
    });
});


socket.on('disconnect', function () {
    console.log('Disconnected from the server');
});

socket.on('updateUserList', (users) => {
    let ol = $('<ol>></ol>');

    users.forEach(function(user) {
        ol.append($('<li></li>').text(user));
    });

    $('#users').html(ol);
});

socket.on('newMessage', function(message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = $('#messageTemplate').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();

    /* $('#messages').append(html);
    let li = $('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    $('#messages').append(li); 
    */
});

socket.on('newLocationMessage', function(message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = $('#locationMessageTemplate').html();
    let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();

    /* let li = $('<li></li>');
    let a = $('<a target="_blank" >My current location</a>');

    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);

    li.append(a);
    $('#messages').append(li); */
});

$('#messageForm').on('submit', function(event) {
    event.preventDefault();

    let messageTextbox = $('[name=message]');

    socket.emit('createMessage', {
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