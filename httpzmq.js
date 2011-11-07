(function() {
  var http, socket, zmq;
  http = require('http');
  zmq = require('zeromq');
  socket = zmq.createSocket('rep');
  socket.bindSync('tcp://*:23479');
  socket.on('message', function(data) {
    var options, req;
    options = JSON.parse(data.toString('utf8'));
    console.log('Request: ', options);
    req = http.request(options, function(result) {
      var body;
      body = "";
      result.on('data', function(chunk) {
        return body += chunk;
      });
      return result.on('end', function(chunk) {
        return socket.send(JSON.stringify({
          statusCode: result.statusCode,
          headers: result.headers,
          body: body,
          userData: options.userData
        }));
      });
    });
    return req.end();
  });
}).call(this);
