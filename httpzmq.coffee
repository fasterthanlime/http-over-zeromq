http = require('http');
zmq = require('zeromq')

socket = zmq.createSocket('rep')
socket.bindSync('tcp://*:23479')
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
