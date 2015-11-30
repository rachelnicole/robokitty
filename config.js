var convict = require('convict')

var conf = convict({
  particleKey: {
    doc: 'Replace this with your particle key.',
    format: String,
    default: 'REPLACE_WITH_YOUR_PARTICLE_KEY',
    env: 'PARTICLE_KEY'
  },
  photonId: {
    doc: 'Replace this with your photon id.',
    format: String,
    default: 'REPLACE_WITH_YOUR_PHOTON_ID',
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