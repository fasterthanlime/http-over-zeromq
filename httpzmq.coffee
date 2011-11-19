http = require('http');
zmq = require('zmq')

socket = zmq.createSocket('rep')
PORT = 23479
socket.bindSync('tcp://*:' + PORT)
socket.on 'message', (data) ->
  options = JSON.parse data.toString('utf8')
  console.log 'Request: ', options
  req = http.request options, (result) ->
    body = ""
    result.on 'data', (chunk) ->
      body += chunk
    result.on 'end', (chunk) ->
      socket.send JSON.stringify {
        statusCode: result.statusCode
        headers: result.headers
        body: body
        userData: options.userData
      }
  req.end()
console.log 'Listening on port ' + PORT
