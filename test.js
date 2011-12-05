(function() {
  var http, socket, zmq;

  http = require('http');

  zmq = require('zeromq');

  socket = zmq.createSocket('req');

  socket.connect('tcp://localhost:23479');

  socket.on('message', function(data) {
    return console.log(data.toString('utf8'));
  });

  socket.send(JSON.stringify({
    host: 'humanstxt.org',
    port: 80,
    path: '/humans.txt',
    method: 'GET',
    userData: 'request1'
  }));

  socket.send(JSON.stringify({
    host: 'google.com',
    port: 80,
    path: '/humans.txt',
    method: 'GET',
    userData: 'request2'
  }));

}).call(this);
