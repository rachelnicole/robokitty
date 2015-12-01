var five = require ('johnny-five'),
  Particle = require('particle-io'),
  CronJob = require('cron').CronJob;

function getDecorateIO(config) {

  if (!config.token || !config.deviceId) {
    console.log('You need to provide your PARTICLE_KEY and/or PHOTON_ID')
    console.log('Add relevant information to the config.js file, you can find where to get this info in the README')
    throw new Error('Device credentials not specified.')
  }

  function decorateIO(io) {
    // Create a Johnny Five board instance to represent your Particle Photon.
    // Board is simply an abstraction of the physical hardware, whether it is 
    // a Photon, Arduino, Raspberry Pi or other boards. 
    var board = new five.Board({ 
      io: new Particle({ 
        token: config.token,
        deviceId: config.deviceId
      })
    });

    // Creates a string that defines hourly increments
    function makeCronString(input){
      var accum = '0';
      var increment = parseInt(input, 10);
      while( increment < 24 ){
        accum = accum + ',' + increment
        increment = increment + parseInt(input, 10);
      }
      return '0 0 ' + accum + ' * * *';
    }

    var currentJob,
        currentTimeValue;

    board.on('ready', function() {

      var servo = new five.Servo({
        pin: 'd0',
        type: 'continuous',
        deadband: [ 95, 96 ]
      });

      servo.stop();

      io.sockets.on('connection', function (socket) {
        console.log('sockets on connection');

        socket.emit('setSchedule', currentTimeValue);

        socket.on('click', function () {
          console.log('socket is on');

          // have servo turn counter clockwise incase any food is stuck before turning clockwise to dispense
          servo.ccw(1);

          setTimeout(function() {
            servo.cw(1);
            console.log('change direction');
          }, 1500);

          setTimeout(function() {
            servo.stop();
            console.log('settimeout');
          }, 2000);
        });

        socket.on('feeding', function(timeValue){
          console.log('schedule is set');
          // Cancels out existing time preferences.
          if (currentJob) {
            currentJob.stop();
          }

          currentTimeValue = timeValue;

          if (timeValue === '0') {
            return;
          }

          var feedingInterval = makeCronString(timeValue);

          // Sets Cron Job for feeding schedule
          currentJob = new CronJob(feedingInterval, function() {

          servo.ccw(1);

          setTimeout(function() {
            servo.cw(1); 
            console.log('change direction');
          }, 1500);

          setTimeout(function() {
            servo.stop(); 
            console.log('settimeout');
          }, 2000);

          }, null, true, 'America/New_York');
        });
      });
    });
  };
  return decorateIO;
};

module.exports = getDecorateIO;
