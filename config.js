var convict = require('convict');

// REPLACE PARTICLE KEY AND DEVICE ID WITH RELEVANT INFORMATION FOR YOUR PHOTON,
// YOU CAN FIND OUT WHERE TO GET THIS BY LOOKING AT THE README

var conf = convict({
  token: {
    doc: 'Replace this with your particle key.',
    format: String,
    default: '',
    env: 'PARTICLE_KEY'
  },
  deviceId: {
    doc: 'Replace this with your photon id.',
    format: String,
    default: '',
    env: 'PHOTON_ID'
  },
  port: {
    doc: 'The port that the app is listening on.',
    format: Number,
    default: 3000,
    env: 'PORT'
  }
})

conf.validate()
module.exports = conf.get()