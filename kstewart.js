/*eslint-env node */
"use strict";

var RollingSpider = require("rolling-spider");
var temporal = require("temporal");
var keypress = require("keypress");

keypress(process.stdin);

// listen for the 'keypress' event


process.stdin.setRawMode(true);
process.stdin.resume();

var yourDrone = new RollingSpider();

yourDrone.connect(function() {
  yourDrone.setup(function() {
    process.stdin.on("keypress", function (ch, key) {
      if (key && key.name === "m") {
        yourDrone.emergency();
      }
      if (key && key.name === "q") {
        yourDrone.land();
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
          yourDrone.flatTrim();
          yourDrone.startPing();
          yourDrone.takeOff();
        }
      },
      {
        delay: 3000,
        task: function() {
          yourDrone.up({speed: 25, steps: 3});
        }
      },
      {
        delay: 1000,
        task: function() {
          yourDrone.forward({speed: 100, steps: 10});
        }
      },
      {
        delay: 500,
        task: function() {
          yourDrone.frontFlip();
        }
      },
      {
        delay: 500,
        task: function() {
          yourDrone.backFlip();
        }
      },
      {
        delay: 1000,
        task: function() {
          yourDrone.up({speed: 25, steps: 3});
        }
      },
      {
        delay: 1500,
        task: function() {
          yourDrone.clockwise({speed: 100, steps: 50});
        }
      },
      {
        delay: 200,
        task: function() {
          yourDrone.forward({speed: 100, steps: 5});
        }
      },
      {
        delay: 200,
        task: function() {
          yourDrone.backFlip();
        }
      },
      {
        delay: 5000,
        task: function () {
          yourDrone.land();
        }
      }]);
  });
});
