var fs = require('fs');
var files = fs.readdirSync('./tmp/atp-gui/web-data/web/');

exports.writeWeb = (fileName) => {
    fs.writeFile("./tmp/atp-gui/web-data/web/" + fileName, "", function(err) {
        if(err) {
            return false;
        }
    }); 

    return true;
}