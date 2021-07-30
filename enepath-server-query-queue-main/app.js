const express = require('express');
const bodyParser = require('body-parser')
const process = require('process');
const CORS = require('cors');
const app = express()
const port = process.env.PORT || 4000
const socketPort = process.env.PORT || 4001;

const chokidar = require('chokidar');
const http = require("http");
const socketIo = require('socket.io')
const path = require('path')
// var fileLocation = path.join(__dirname, '/var/tmp/atp-gui/web-data/station/');
var fileLocation = '/var/tmp/atp-gui/web-data/station/';

// Handlers;
const {loginState, startUpState, writeStartUpState, login, logout} = require('./src/loginstate');
const {writeButton} = require('./src/writeButton')
const {homePage} = require('./src/stationData')
const { endCall, holdCall, startCall, incomingCall, privateCallHandler, webTextHandler } = require('./src/phone')
jsonParser = bodyParser.json()

app.use(CORS())
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
app.post('/', jsonParser, homePage)


// Write button;
app.post('/writeButton', jsonParser, writeButton)


// Extract current login state;
app.get('/start-up-state', startUpState)
app.get('/write-startup-state', writeStartUpState)
app.get('/login-state', loginState)
app.post('/login', jsonParser, login)
app.get('/logout', jsonParser, logout)


// Station API's.
app.get('/end-call', endCall);
app.get('/hold-call', holdCall);
app.post('/start-call', jsonParser, startCall)
app.get('/incoming-call', incomingCall)
app.get('/private-call', privateCallHandler)
app.get('/web-text', webTextHandler);

// Web Sockets;
//Setting up express and adding socketIo middleware
const server = http.createServer(app);
const io = socketIo(server,{
  cors: {
    origin: '*',
  }
});

//Setting up a socket with the namespace "connection" for new sockets
io.on("connection", socket => {
    console.log("New client connected");

    socket.on("incoming data", (data)=>{
        //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
       socket.emit("outgoing data", {num: data});
    });

    console.log("Chokidar is watching")
    const watcher = chokidar.watch('.', {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true,
        followSymlinks: false,
        cwd: fileLocation
    });
    watcher.on('add', (event, path) => {
        socket.emit('file-added', {filename: path, eventName: event})
    })
    watcher.on('unlink', (event, path) => {
        socket.emit('file-removed', {filename: path, eventName: event})
    })

    //A special namespace "disconnect" for when a client disconnects
    socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen( socketPort , () => console.log(`Listening on port ${socketPort}`));

app.use('/', (req, res) => {
    res.send("Server is online and functional.")
})

app.listen(port, () => {
    console.log('Server is online and functional.')
})