var Hapi = require('hapi'),
    Inert = require('inert'),
    Path = require('path');

function getServer(config) {
  var server = new Hapi.Server();

  server.connection({ port: config.port });

  server.register(Inert, function () {

    server.route({
      method: 'GET',
      path: '/',
      handler: {
        file: 'public/index.html'
      }
    });

    server.route({
      method: 'GET',
      path: '/robokitty.js',
      handler: {
        file: 'public/robokitty.js'
      }
    });

    server.route({
      method: 'GET',
      path: '/robokitty-logo.jpg',
      handler: {
        file: 'public/robokitty-logo.jpg'
      }
    });

    server.route({
      method: 'GET',
      path: '/robokitty.css',
      handler: {
        file: 'public/robokitty.css'
      }
    });

  });

  return server;
};

module.exports = getServer;
