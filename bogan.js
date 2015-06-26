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
        task: function () {
          yourDrone.up({speed: 100, steps: 10});
        }
      },
      {
        delay: 1000,
        task: function () {
          yourDrone.clockwise({speed: 100, steps: 100});
        }
      },
      {
        delay: 0,
        task: function () {
          yourDrone.tiltLeft({speed: 100, steps: 10});
        }
      },
      {
        delay: 2000,
        task: function () {
          yourDrone.tiltRight({speed: 100, steps: 10});
        }
      },
      {
        delay: 2000,
        task: function () {
          yourDrone.tiltLeft({speed: 100, steps: 10});
        }
      },
      {
        delay: 2000,
        task: function () {
          yourDrone.tiltRight({speed: 100, steps: 10});
        }
      },
      {
        delay: 6000,
        task: function () {
          yourDrone.flatTrim();
        }
      },
      {
        delay: 1000,
        task: function () {
          yourDrone.leftFlip();
        }
      },
      {
        delay: 1000,
        task: function () {
          yourDrone.frontFlip();
        }
      },
      {
        delay: 1000,
        task: function () {
          yourDrone.backFlip();
        }
      },
      {
        delay: 1000,
        task: function () {
          yourDrone.rightFlip();
        }
      },
      {
        delay: 4000,
        task: function () {
          yourDrone.flatTrim();
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
