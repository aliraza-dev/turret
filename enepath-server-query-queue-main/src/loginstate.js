var fs = require('fs');
var filesStation = fs.readdirSync('./tmp/atp-gui/web-data/station/');
const {getTimeStamp} = require('../utils/timestamp')
const {writeWeb} = require('../utils/fileHelper')

function getLoginState() {
    const startState = filesStation.find(el => {
        const splitEl = el.split('%')
        if (splitEl[1] === 'STATE') {
            return el;
        } 
        return false
    })
    const state = { login_state: 'LOGGEDOUT' }
    // Filter out the state;
    if ( startState ) {
        const splitState = startState.split('%'); 
        state.login_state = splitState[2]
    }

    return state
}

exports.loginState = (req, res) => {
    // Extract state from file system;
    const startState = getLoginState();
    
    res.status(200).send({data: startState, message: "Status Fetched Successfully"});
}

exports.startUpState = (req, res) => {

}

exports.writeStartUpState = (req, res) => {
    let timestamp = getTimeStamp()
    
    let fileName = `${timestamp}%REQUEST%STARTUP%`;

    fs.writeFile("./tmp/atp-gui/web-data/web/" + fileName, "", function(err) {
        if(err) {
            return console.log(err);
        }
    }); 
    
    // return current state;
    const data = getLoginState();
    res.status(200).send({data, message: "Status Fetched Successfully"});
}

exports.login = (req, res) => {

    const body = {
        email: req.body.email,
        password: req.body.password
    }

    let timestamp = getTimeStamp();
    let filename = `${timestamp}%REQUEST%LOGIN%${body.email}%${body.password}%`
    if (writeWeb(filename))  res.status(200).json({message: "Login Details written in"})
    else res.status(500).json({ message:"Something went wrong, please try again" })
}

exports.logout = (req, res) => {
    let timestamp = getTimeStamp();
    let filename = `${timestamp}%STATE%LOGOUT%`
    if (writeWeb(filename))  res.status(200).json({message: "User have been logged out Successfully"})
    else res.status(500).json({ message:"Something went wrong, please try again" })
}

