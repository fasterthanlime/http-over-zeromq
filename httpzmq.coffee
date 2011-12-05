http = require('http');
zmq = require('zmq')

socket = zmq.createSocket('rep')
PORT = 23479
socket.bindSync('tcp://*:' + PORT)
socket.on 'message', (data) ->
  options = JSON.parse data.toString('utf8')
  if options.method == 'POST' || options.method == 'PUT' || options.method == 'DELETE'
    options.headers['Content-Length'] = 0 # so.. only empty POST requests for now?
  console.log 'Request: ', options
  req = http.request options, (result) ->
    body = ""
    result.on 'data', (chunk) ->
      body += chunk
    result.on 'end', (chunk) ->
      payload = {
        statusCode: result.statusCode
        headers: result.headers
        body: body
        userData: options.userData
      }
      socket.send JSON.stringify payload
  req.end()
console.log 'Listening on port ' + PORT
