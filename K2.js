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
var STEPS = 2;
var SPEED = 2;

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
        delay: 3000,
        task: function () {
          //3 seconds
          //potentially change speedto account for time before drop
          // 23 seconds until drop from this point
          drone.up({steps: STEPS * 7, speed: SPEED * 5});
        }
      },
      {
        delay: 5000,
        task: function() {
          //5 seconds
          drone.forward({steps: STEPS * 25});
        }
      },
      {
        delay: 4500,
        task: function() {
          //9.5 seconds
          drone.backward({steps: STEPS * 10});
        }
      },
      {
        delay: 3500,
        task: function() {
          //13 seconds
          drone.left({steps: STEPS * 5});
        }
      },
      {
        delay: 4000,
        task: function() {
          //17 seconds
          drone.right({steps: STEPS * 10});
        }
      },
      {
        delay: 3000,
        task: function() {
          //20 seconds
          drone.turnRight({steps: STEPS * 50, speed: SPEED * 35});
        }
      },
      {
        delay: 3000,
        task: function() {
          //23 seconds
          drone.leftFlip();
        }
      },
      {
        delay: 5000,
        task: function() {
          // 28 seconds
          drone.rightFlip();
        }
      },
      {
        delay: 3000,
        task: function() {
          // 31 seconds
          drone.forward({speed: SPEED * 35, steps: STEPS * 50});
        }
      },
      {
        delay: 5000,
        task: function() {
          // 36 seconds
          drone.down({steps: STEPS * 5});
        }
      },
      {
        delay: 2000,
        task: function() {
          //38 seconds
          drone.up({steps: STEPS * 10});
          drone.turnLeft({steps: STEPS * 50, speed: SPEED * 50});
        }
      },
      {
        delay: 7000,
        task: function() {
          //45 seconds
          drone.land();
        }
      }
    ]);
  });
});
