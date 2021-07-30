var INotifyWait = require('inotifywait');
 
var watch1 = new INotifyWait('./var/tmp/atp-gui/web-data/station/', { recursive: false });
watch1.on('ready', function (filename) {
  console.log('watcher is watching');
});
watch1.on('add', function (filename) {
  console.log(filename + ' added');
  watch1.close(); // stop watching
});
 
var watch2 = new INotifyWait('/var/log/', { recursive: true });
watch2.on('change', function (filename) {
  console.log(filename + ' changed');
  watch2.close(); // stop watching
});
 
var watch3 = new Inotifywait("./var/tmp/atp-gui/web-data/station/", {
            recursive: true, // recurse sub folders
            events: ["create", "move", "delete"], // events to listen to
            spawnArgs: {stdio: "inherit"}, // spawn args controlling bin spawning
            bin: "./tmp/atp-gui/web-data/inotifywait" // bin path
        });
        
watch3.on('change', function (filename) {
  console.log(filename + ' changed');
  watch3.close(); // stop watching
});