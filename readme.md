# Director

This is a simple solution to bring some camera coverage to your event

## Getting started

- install peerjs locally: `npm install -g peer`
- run it: `peerjs -p 9020`
- start a local server: `static -p 9030 -a 0.0.0.0`
- open `director.html` on a computer
- open `send.html` on another computer with webcam on the same network, adjust peer host in html to match the ip of the peer server
- select "remote" in the director page and enter the peer key of the remote host (default: `test1`)
- refresh the `send.html` page

It is a bit clumsy and needs a lot of work still. But it is a start.

## Development

This projects needs a lot of love still. Some things to do:

- more elaborate readme
- get the POC working
- work with peer as a service, removing the need to install it locally
- host everything via github
- styling
- make it work with mhub to control everything
- connect to display system