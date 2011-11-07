(function() {
  var PORT, http, socket, zmq;
  http = require('http');
  zmq = require('zeromq');
  PORT = 23479;
  socket = zmq.createSocket('rep');
  socket.bindSync('tcp://*:' + PORT);
  socket.on('message', function(data) {
    return JSON.parse(data, function(options) {
      return http.request(options, function(result) {
        return socket.send();
      });
    });
  });
}).call(this);
