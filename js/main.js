var remoteVideo = document.getElementById("video1");
var peer = new Peer('director', {host: 'localhost', port: 9020, path: '/'});
// var peer = new Peer('test2', {host: 'localhost', port: 9020, path: '/'});
// You can pick your own id or omit the id if you want to get a random one from the server.
peer.on('connection', function(conn) {
    conn.on('data', function(data){
        // Will print 'hi!'
        console.log(data);
    });
});

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

// peer.on('call', function(call) {
//     console.log(call);
//     call.on('stream', function(remoteStream) {
//         console.log('stream');
//         // Show stream in some video/canvas element.
//         remoteVideo.src = URL.createObjectURL(remoteStream);
//     });
//     call.answer();
// });


angular.module('director',[]).controller('displayController',function($scope, $sce) {
    var ctrl = this;

    this.monitors = [];
    var initial = 4;
    for (var i = 0; i< initial; i++) {
        this.monitors.push({index: i});
    }

    this.currentMonitor = null;
    this.select = function(monitor) {
        if (this.currentMonitor) {
            this.currentMonitor.selected = false;
        }
        monitor.selected = true;
        this.currentMonitor = monitor;
    }

    this.select(this.monitors[0]);

    this.isLocal = function(monitor) {
        return monitor.location == 'local';
    }
    this.isRemote = function(monitor) {
        return monitor.location == 'remote';
    }

    this.selectLocation = function(monitor) {
        monitor.src = '';
        console.log(monitor.src);
    }

    this.selectCamera = function(monitor) {
        console.log(monitor);
        navigator.getUserMedia({
            video: true,
            audio: false,
            sourceId: monitor.camera.id
        }, function(stream) {
            // var url = URL.createObjectURL(stream);
            var url = $sce.trustAsResourceUrl(URL.createObjectURL(stream));
            monitor.src = url;
            $scope.$apply();
        }, function(err) {
            console.log('Failed to get local stream' ,err);
        });
    }

    document.addEventListener('keydown',function(e) {
        var number = e.which-49;
        ctrl.select(ctrl.monitors[number]);
        $scope.$apply();
    });

    MediaStreamTrack.getSources(function(sources) {
        ctrl.cameras = sources.filter(function(s) {
            return s.kind == 'video';
        });
    });

    //handle incoming webrtc call
    peer.on('call', function(call) {
        console.log(call);
        ctrl.monitors.forEach(function(monitor) {
            if (monitor.peer === call.peer) {
                call.on('stream', function(remoteStream) {
                    console.log('stream');
                    // Show stream in some video/canvas element.
                    var url = $sce.trustAsResourceUrl(URL.createObjectURL(remoteStream));
                    monitor.src = url;
                    $scope.$apply();
                });
                call.answer();
            }
        })
    });
});