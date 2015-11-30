var Lab = require('lab'),
  getServer = require('../lib/server.js'),
  assert = require('chai').assert,
  lab = exports.lab = Lab.script(),
  it = lab.it,
  describe = lab.describe;

describe('Server', function() {
  var config = {
    port: 3000
  }
  var server = getServer(config);

  it('has a valid / route', function(done) {
    server.inject({url: '/'}, function(response) {
      assert(response.statusCode === 200, response.statusCode + ' does not equal 200.')
      done()
    });
  });

  it('has a valid /robokitty.js route', function(done) {
    server.inject({url: '/robokitty.js'}, function(response) {
      assert(response.statusCode === 200, response.statusCode + ' does not equal 200.')
      done()
    });
  });

  it('has a valid /robokitty.css route', function(done) {
    server.inject({url: '/robokitty.css'}, function(response) {
      assert(response.statusCode === 200, response.statusCode + ' does not equal 200.')
      done()
    });
  });

});
