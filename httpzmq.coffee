http = require('http')
zmq = require('zeromq')

PORT = 23479

socket = zmq.createSocket('rep')
socket.bindSync 'tcp://*:' + PORT

socket.on 'message', (data) ->
  console.log 'Request: ', data.toString('utf8')
  options = JSON.parse data.toString('utf8')
  req = http.request options, (result) ->
    body = ""
    result.on 'data', (chunk) ->
      body += chunk
    result.on 'end', (chunk) ->
      socket.send JSON.stringify {
        status: result.statusCode
        headers: result.headers
        body: body
      }
  req.end()
