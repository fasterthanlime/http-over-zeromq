(function() {
  var PORT, http, socket, zmq;

  http = require('http');

  zmq = require('zmq');

  socket = zmq.createSocket('rep');

  PORT = 23479;

  socket.bindSync('tcp://*:' + PORT);

  socket.on('message', function(data) {
    var options, req;
    options = JSON.parse(data.toString('utf8'));
    if (options.method === 'POST' || options.method === 'PUT') {
      options.headers['Content-Length'] = 0;
    }
    console.log('Request: ', options);
    req = http.request(options, function(result) {
      var body;
      body = "";
      result.on('data', function(chunk) {
        return body += chunk;
      });
      return result.on('end', function(chunk) {
        var payload;
        payload = {
          statusCode: result.statusCode,
          headers: result.headers,
          body: body,
          userData: options.userData
        };
        return socket.send(JSON.stringify(payload));
      });
    });
    return req.end();
  });

  console.log('Listening on port ' + PORT);

}).call(this);
