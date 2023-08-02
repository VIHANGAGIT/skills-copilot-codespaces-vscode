//Create web server
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

//Set up static files
app.use(express.static(path.join(__dirname, 'public')));

//Create server
var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('Listening on port ', port);
});

//Create socket
var io = require('socket.io')(server);

//Listen for connection
io.on('connection', function(socket){
  console.log('New connection: ', socket.id);

  //Listen for message
  socket.on('message', function(data){
    console.log('message: ', data);

    //Broadcast message to all sockets
    io.emit('message', data);
  });

  //Listen for disconnect
  socket.on('disconnect', function(){
    console.log('Disconnected: ', socket.id);
  });
});