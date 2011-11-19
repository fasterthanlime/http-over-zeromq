# HTTP over ØMQ 

This project will probably go down in history as worst idea ever, but hey, zeromq services are fun
and we needed async http requests, which node is kinda good at.

## Disclaimer

Firewall it. Don't make it accessible from the interwebs.

Change the default port, 23479 is a bit too obvious.

## Installing

Make sure you have libev and zeromq 2.x installed, then go clone [zeromq.node](https://github.com/JustinTulloss/zeromq.node),
because the node 0.6 support hasn't hit the npm just yet, then be all

    npm install path/to/zeromq.node

## Using

Read the source, luke, it's not that hard!

