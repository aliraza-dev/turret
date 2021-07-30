var fs = require('fs');
var files = fs.readdirSync('/var/tmp/atp-gui/web-data/web/');

exports.writeWeb = (fileName) => {
    fs.writeFile("/var/tmp/atp-gui/web-data/web/" + fileName, "", function(err) {
        if(err) {
            return false;
        }
    }); 

    return true;
}