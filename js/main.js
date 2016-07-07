var remoteVideo = document.getElementById("video1");
var peer = new Peer('test2', {host: 'localhost', port: 9020, path: '/'});
// var peer = new Peer('test2', {host: 'localhost', port: 9020, path: '/'});
// You can pick your own id or omit the id if you want to get a random one from the server.
peer.on('connection', function(conn) {
    conn.on('data', function(data){
        // Will print 'hi!'
        console.log(data);
    });
});

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

peer.on('call', function(call) {
    console.log(call);
    call.on('stream', function(remoteStream) {
        console.log('stream');
        // Show stream in some video/canvas element.
        remoteVideo.src = URL.createObjectURL(remoteStream);
    });
    call.answer();
});

function selectMonitor(number) {
    var v = document.getElementById('video'+number);
    if (v) {
        if (currentMonitor) {
            currentMonitor.classList.remove('online')
        }
        currentMonitor = v.parentNode;
        currentMonitor.classList.add('online');
    }
}

var currentMonitor;
document.addEventListener('keydown',function(e) {
    var number = e.which-48;
    selectMonitor(number);
});
selectMonitor(1);