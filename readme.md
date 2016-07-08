# Director

This is a simple solution to bring some camera coverage to your event

## Getting started

- get an api key at <http://peerjs.com/peerserver>
- clone the repo
- start a local server: `static`
- open `director.html` on a computer, enter your key, press `connect`
- open `send.html` on another computer with webcam on the same network, enter your key and a name for the camera and press `connect`

**Note**: it does currently not work on the hosted github pages, since peerjs does not offer a secure peer server in the cloud. And we need https for webcams to work. We might need to run our own peer server or persuade peerjs to offer https.

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