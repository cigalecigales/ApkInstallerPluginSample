var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    onDeviceReady: function() {
        this.receivedEvent('install');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var element = document.getElementById(id);

        element.addEventListener('click', function() {

            var fileTransfer = new FileTransfer();

            // Get cordova file data directory (app sandbox directory)
            //  > file:///data/user/0/io.cordova.apk.installer.sample/files/
            var sandBoxDirectory = cordova.file.dataDirectory;

            // Please set apk download path
            var apkUrl = 'http://192.168.3.2:8080/ApkDownloadProject/faces/javax.faces.resource/apk/android-debug.apk';

            // Get file name by apk url;
            var fileName = apkUrl.match(/[^/]+$/i)[0];

            var modal = document.querySelector('ons-modal');

            modal.show();

            fileTransfer.download(
                apkUrl,
                sandBoxDirectory + fileName,
                function(entry) {
                    console.log("download success: " + entry.toURL());
                    // Install app
                    apkInstaller.install(fileName, function(msg) {
                        // Start the installer
                        modal.hide();
                    }, function(error) {
                        modal.hide();
                        ons.notification.alert('Install Error !!: ' + error);
                    });
                },
                function(error) {
                    modal.hide();
                    ons.notification.alert('Download Error !!: ' + error);
                },
                false, {}
            );

        }, false);
    }
};

app.initialize();
