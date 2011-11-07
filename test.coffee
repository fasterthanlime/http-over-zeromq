http = require('http')
zmq = require('zeromq')

socket = zmq.createSocket('req')
socket.connect 'tcp://localhost:23479' # magic numbers ftw

socket.on 'message', (data) ->
  console.log data.toString('utf8')

socket.send JSON.stringify {
  host: 'humanstxt.org'
  port: 80
  path: '/humans.txt'
  method: 'GET'
}
