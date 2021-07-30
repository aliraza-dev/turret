    var fs = require('fs');
exports.writeButton = (req, res) => {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let timestamp = (""+ year + month + date + hours + minutes + seconds);
    
    let fileName = `${timestamp}%PRESS%BU%${req.body.position}%`;

    fs.writeFile("/var/tmp/atp-gui/web-data/web/" + fileName, "", function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The message was saved!");
        res.send("The message was saved!")
    }); 
}