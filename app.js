var config = require('./config.js'),
  getServer = require('./lib/server.js'),
  getDecorateIO = require('./lib/device.js');

// Create a Server with the specified configurations
var server = getServer(config);

// Socket.io server listens to our server
var io = require('socket.io').listen(server.listener);

// Create a decorator function that adds device support based on specified configurations
var decorateIO = getDecorateIO(config);

// Decorate the server object with socket listeners to interact with the device
decorateIO(io);

// Start the server
server.start(function (err) {
    if (err) { throw err; }
    console.log('Server running at:', server.info.uri);
});
