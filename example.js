/*eslint-env node */
"use strict";

var RollingSpider = require("rolling-spider");
var temporal = require("temporal");
var keypress = require("keypress");

keypress(process.stdin);

// listen for the 'keypress' event


process.stdin.setRawMode(true);
process.stdin.resume();

var drone = new RollingSpider();

drone.connect(function() {
  drone.setup(function() {
    process.stdin.on("keypress", function (ch, key) {
      if (key && key.name === "m") {
        drone.emergency();
      }
      if (key && key.name === "q") {
        drone.land();
      }
      if (key && key.ctrl && key.name === "c") {
        process.stdin.pause();
        process.exit(); // eslint-disable-line
      }
    });


    // NEW CODE
    temporal.queue([
      {
        delay: 0,
        task: function () {
          drone.flatTrim();
          drone.startPing();
          drone.takeOff();
        }
      },
      {
        delay: 5000,
        task: function () {
          drone.land();
        }
      }]);
  });
});
