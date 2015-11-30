var Hapi = require('hapi'),
    Inert = require('inert'),
    path = require('path');

function getServer(config) {
  var server = new Hapi.Server({
    connections: {
      routes: {
        files: {
          relativeTo: Path.join(__dirname, 'public')
        }
      }
    }
  });

  server.connection({ port: config.port });

  server.register(Inert, function () {});

  server.route({
    method: 'GET',
    path: '/',
    handler: {
      file: 'index.html'
    }
  });

  server.route({
    method: 'GET',
    path: '/robokitty.js',
    handler: {
      file: 'robokitty.js'
    }
  });

  server.route({
    method: 'GET',
    path: '/robokitty.css',
    handler: {
      file: 'robokitty.css'
    }
  });

  return server;
};

module.exports = getServer;
