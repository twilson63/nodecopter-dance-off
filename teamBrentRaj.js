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
      // first step takes care of liftoff, should be ~ 3feet
      {
        delay: 0,
        task: function () {
          drone.flatTrim();
          drone.startPing();
          drone.takeOff();
        }
      },
      {
        delay: 4000,
        task: function() {
          drone.up({steps: 10});
          drone.backflip():
        }
      },
      {
        delay: 4000,
        task: function() {
          drone.up({steps: 10});
        }
      },
      {
        delay: 0,
        task: function() {
          drone.turnRight({speed: 100});
          drone.turnRight({speed: 100});
          drone.turnRight({speed: 100});
          drone.turnRight({speed: 100});
        }
      }
      // 11ish seconds used so far
      {
        delay: 4000,
        task: function() {
          drone.leftFlip();
        }
      },
      {
        delay: 4000,
        task: function() {
          drone.rightFlip();
        }
      },
      {
        delay: 2000,
        task: function() {
          drone.down({steps: 20});
        }
      },
      {
        delay: 0,
        task: function() {
          drone.turnLeft({speed: 100});
          drone.turnLeft({speed: 100});
          drone.turnLeft({speed: 100});
          drone.turnLeft({speed: 100});
          drone.frontFlip({speed: 100});
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
