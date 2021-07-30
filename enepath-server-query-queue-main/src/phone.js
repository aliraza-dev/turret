const { getTimeStamp } = require('../utils/timestamp')
var fs = require('fs');
var files = fs.readdirSync('/var/tmp/atp-gui/web-data/station/');

exports.endCall = (req, res) => {
    const timeStamp = getTimeStamp();
    let fileName = `${timeStamp}%END%`;

    fs.writeFile("/var/tmp/atp-gui/web-data/web/" + fileName, "", function(err) {
        if(err) {
            return console.log(err);
        }
        res.send("Call ended Successfully!")
    }); 
}


exports.holdCall = (req, res) => {
    const timeStamp = getTimeStamp();
    let fileName = `${timeStamp}%HOLD%`;

    fs.writeFile("/var/tmp/atp-gui/web-data/web/" + fileName, "", function(err) {
        if(err) {
            return console.log(err);
        }
        res.send("Call on Hold!")
    }); 
}


exports.startCall = (req, res) => {

    const dialBody = { number: req.body.number }
    const timeStamp = getTimeStamp();
    let fileName = `${timeStamp}%DIAL%${dialBody.number}%`;

    fs.writeFile("/var/tmp/atp-gui/web-data/web/" + fileName, "", function(err) {
        if(err) {
            return console.log(err);
        }
        res.send("Call on Hold!")
    }); 
}

exports.incomingCall = (req, res) => {
    try {
        const incoming_call = files.find(el => {
        const splitEl = el.split('%')
        if (splitEl[1] === 'INCOMING') {
            return el;
        } 
        return false
        })

        let data = {
            state: false,
            number: 0
        };
        // Filter out the state;
        if ( incoming_call ) {
            const splitState = incoming_call.split('%'); 
            data.number = splitState[3]
            data.state = true;
        }

        res.status(200).send(data)
    } catch(err) {
        res.status(500).send("Something went wrong, please try again")
    }
}


exports.privateCallHandler = (req, res) => {
    try {
        const incoming_call = files.find(el => {
        const splitEl = el.split('%')
        if (splitEl[1] === 'PRIVATE') {
            return el;
        } 
        return false
        })

        let data = {
            state: false,
            number: 0
        };
        // Filter out the state;
        if ( incoming_call ) {
            const splitState = incoming_call.split('%'); 
            data.number = splitState[3]
            data.state = splitState[4] == "ON" ? true : false;
        }
        
        res.status(200).send(data)
    } catch(err) {
        res.status(500).send("Something went wrong, please try again")
    }
}

exports.webTextHandler = (req, res) => {
    try {
        
        // Read file;
        fs.readFile('/var/tmp/atp-gui/web-data/web-page.txt', (err, data) => {
            if (err) res.status(404).send("Unable to fetch file from source")
            res.status(200).json({data: data.toString()})
        })

    } catch (err) {
        res.status(500).send("Unable to fetch file from source")
    }
}