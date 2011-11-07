(function() {
  var PORT, http, socket, zmq;
  http = require('http');
  zmq = require('zeromq');
  PORT = 23479;
  socket = zmq.createSocket('rep');
  socket.bindSync('tcp://*:' + PORT);
  socket.on('message', function(data) {
    var options, req;
    console.log('Request: ', data.toString('utf8'));
    options = JSON.parse(data.toString('utf8'));
    req = http.request(options, function(result) {
      var body;
      body = "";
      result.on('data', function(chunk) {
        return body += chunk;
      });
      return result.on('end', function(chunk) {
        return socket.send(JSON.stringify({
          status: result.statusCode,
          headers: result.headers,
          body: body
        }));
      });
    });
    return req.end();
  });
}).call(this);
