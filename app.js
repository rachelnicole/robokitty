var http = require('http'),
		fs = require('fs'),
		index = fs.readFileSync(__dirname + '/index.html'),
		five = require ('johnny-five'),
		Particle = require('particle-io'),
		CronJob = require('cron').CronJob;


// Set up the access credentials for Particle
var token = process.env.PARTICLE_KEY || 'f2d4ea74c99d6c1706ce78808af4be4cdd5317d9'; 
var deviceId = process.env.PHOTON_ID || '300023000247343339373536';

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
			servo.cw(1);

			setTimeout(function() { 
				servo.stop(); 
				console.log('settimeout');  
			}, 5000);
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
				servo.cw(1);

				setTimeout(function() { 
					servo.stop(); 
					console.log('settimeout');  
				}, 5000);

			}, null, true, 'America/New_York');
    });
  }); 
});

app.listen(3000);