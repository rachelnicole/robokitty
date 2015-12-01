var Hapi = require('hapi'),
    Inert = require('inert'),
    Path = require('path');

function getServer(config) {
  var server = new Hapi.Server();

  server.connection({ port: config.port });

  server.register(Inert, function () {

    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: 'public',
          listing: false,
          index: true
        }
      }
    });
  });

  return server;
};

module.exports = getServer;
