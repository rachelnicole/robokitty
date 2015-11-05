var http = require('http'),
    fs = require('fs'),
    index = fs.readFileSync(__dirname + '/index.html'),
    five = require ("johnny-five"),
    Particle = require("particle-io");

// Set up the access credentials for Particle
var token = process.env.PARTICLE_KEY || 'your particle key here'; 
var deviceId = process.env.PHOTON_ID || 'your photon id here';

// Send index.html to all requests
var app = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(index);
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

// Create a Johnny Five board instance to represent your Particle Photon.
// Board is simply an abstraction of the physical hardware, whether it is 
// a Photon, Arduino, Raspberry Pi or other boards. 
var board = new five.Board({ 
  io: new Particle({ 
    token: token, 
    deviceId: deviceId 
  }) 
});

// Checking for incoming socket 'click' actions and toggling the LED.
board.on("ready", function() {
  led = new five.Led('d7');
  console.log('board is ready');

  io.sockets.on('connection', function (socket) {
    console.log('sockets on connection');
    socket.on('click', function () {
      console.log('socket is clicked');
      led.toggle();
    });
  }); 
});

app.listen(3000);