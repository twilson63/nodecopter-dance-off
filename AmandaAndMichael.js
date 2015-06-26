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
          yourDrone.up(100,10);
        }
      },
      {
        delay: 2500,
        task: function () {
          yourDrone.down(100,10);
          yourDrone.flatTrim();
        }
      },
      {
        delay: 2500,
        task: function () {
          yourDrone.up(100,10);
        }
      },
      {
        delay: 2500,
        task: function () {
          yourDrone.down(100,10);
          yourDrone.flatTrim();
        }
      },
      {
        delay: 2500,
        task: function () {
          yourDrone.up(100,20);
          yourDrone.forward(100,20);
        }
      },
      {
        delay: 2500,
        task: function () {
          yourDrone.frontFlip();
          yourDrone.flatTrim();
        }
      },
      {
        delay: 2500,
        task: function () {
          yourDrone.down(100,15);
          yourDrone.flatTrim();
        }
      },
      {
        delay: 2500,
        task: function () {
          yourDrone.tiltRight();
          yourDrone.up(90,8);
        }
      },
      {
        delay: 2500,
        task: function () {
          yourDrone.down(90,8);
          yourDrone.flatTrim();
        }
      },
      {
        delay: 2500,
        task: function () {
          yourDrone.tiltLeft();
          yourDrone.up(80,6);
        }
      },
      {
        delay: 2500,
        task: function () {
          yourDrone.down(80,6);
          yourDrone.flatTrim();
        }
      },
      {
        delay: 2500,
        task: function () {
          yourDrone.land();
        }
      }
      ]);
  });
});
