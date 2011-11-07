http = require('http')
zmq = require('zeromq')

PORT = 23479

socket = zmq.createSocket('rep')
socket.bindSync 'tcp://*:' + PORT

socket.on 'message', (data) ->
  JSON.parse data, (options) ->
    http.request options, (result) ->
      socket.send()
