'use strict';

var socket = io.connect('http://localhost');
var turnOn = document.getElementsByClassName("turn-on")[0];
var schedule = document.getElementById('schedule');

addEventHandler(turnOn, 'click', function(e) {
  e.preventDefault();

  log('you clicked on');
  socket.emit('click');
});

addEventHandler(schedule, 'change', function() {
  log(this.value);
  socket.emit('feeding', this.value);
});

socket.on('setSchedule', function (timeValue) {
  log(timeValue);
});

function addEventHandler(elem, eventType, handler) {
  if (elem.addEventListener) {
    elem.addEventListener(eventType, handler, false);
  }
  else if (elem.attachEvent) {
    elem.attachEvent('on' + eventType, handler); 
  }
}

function log(msg) {
  if (console) {
    console.log(msg);
  }
  else {
    alert(msg);
  }
}
