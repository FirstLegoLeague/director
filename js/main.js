
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;


angular.module('director',[]).controller('displayController',function($scope, $sce) {
    var ctrl = this;

    ctrl.monitors = [];
    var initial = 4;

    ctrl.currentMonitor = null;
    ctrl.select = function(monitor) {
        if (ctrl.currentMonitor) {
            ctrl.currentMonitor.selected = false;
        }
        monitor.selected = true;
        ctrl.currentMonitor = monitor;
    }

    ctrl.isLocal = function(monitor) {
        return monitor.location == 'local';
    }
    ctrl.isRemote = function(monitor) {
        return monitor.location == 'remote';
    }

    ctrl.selectLocation = function(monitor) {
        monitor.src = '';
        console.log(monitor.src);
    }

    function streamTo(stream, monitor) {
        console.log('stream');
        // Show stream in some video/canvas element.
        var url = $sce.trustAsResourceUrl(URL.createObjectURL(stream));
        monitor.src = url;
    }

    ctrl.connect = function(key) {
        ctrl.peer = new Peer('director', {key: key});
        // var peer = new Peer('director', {host: 'localhost', port: 9020, path: '/'});
        // var peer = new Peer('test2', {host: 'localhost', port: 9020, path: '/'});
        // You can pick your own id or omit the id if you want to get a random one from the server.
        //handle incoming webrtc call
        ctrl.peer.on('call', function(call) {
            console.log(call);
            var newMonitor = {
                index: ctrl.monitors.length,
                peer: call.peer,
                location: 'remote'
            };
            ctrl.monitors.push(newMonitor);
            call.on('stream', function(remoteStream) {
                streamTo(remoteStream, newMonitor);
                $scope.$apply();
            });
            $scope.$apply();
            call.answer();
        });
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

});