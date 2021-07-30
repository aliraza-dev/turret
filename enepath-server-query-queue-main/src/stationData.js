exports.stationData = (req, res) => {
    var fs = require('fs');
    var files = fs.readdirSync('/var/tmp/atp-gui/web-data/station/');
    res.send(files);
}

exports.homePage = async (req, res) => {
    let message = url.parse(req.url, parseQueryString = true).query.message
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let timestamp = (""+ year + month + date + hours + minutes + seconds);

    fs.writeFile("/tmp/" + timestamp + "_" + message, "", function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The message was saved!");
        res.send(true)
    }); 
}