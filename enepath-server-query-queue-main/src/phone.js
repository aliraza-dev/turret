const { getTimeStamp } = require('../utils/timestamp')
var fs = require('fs');
var files = fs.readdirSync('./tmp/atp-gui/web-data/station/');

exports.endCall = (req, res) => {
    console.log("ASD")
    const timeStamp = getTimeStamp();
    let fileName = `${timeStamp}%END%`;

    fs.writeFile("./tmp/atp-gui/web-data/web/" + fileName, "", function(err) {
        if(err) {
            return console.log(err);
        }
        res.send("Call ended Successfully!")
    }); 
}


exports.holdCall = (req, res) => {
    console.log("ASD")
    const timeStamp = getTimeStamp();
    let fileName = `${timeStamp}%HOLD%`;

    fs.writeFile("./tmp/atp-gui/web-data/web/" + fileName, "", function(err) {
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

    fs.writeFile("./tmp/atp-gui/web-data/web/" + fileName, "", function(err) {
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

        let state;
        // Filter out the state;
        if ( incoming_call ) {
            const splitState = incoming_call.split('%'); 
            state = splitState[3]
        }

        res.status(200).send(state)
    } catch(err) {
        res.status(500).send("Something went wrong, please try again")
    }
}