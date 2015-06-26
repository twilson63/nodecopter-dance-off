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
          yourDrone.up(50, 25);
        }
      },
      {
        delay: 250,
        task: function () {
          yourDrone.down(50,25);
        }
      },
      {
        delay: 250,
        task: function () {
          yourDrone.up(50,25);
        }
      },
      {
        delay: 250,
        task: function () {
          yourDrone.down(50,25);
        }
      },
      {
        delay: 250,
        task: function () {
          yourDrone.up(50, 25);
          yourDrone.forward(50,25);
        }
      },
      {
        delay: 250,
        task: function () {
          yourDrone.frontFlip();

        }
      },
      {
        delay: 250,
        task: function () {
          yourDrone.down(50,25);
        }
      },
      {
        delay: 250,
        task: function () {
          yourDrone.tiltRight();
          yourDrone.up(40,20);
        }
      },
      {
        delay: 250,
        task: function () {
          yourDrone.down(40,20);
        }
      },
      {
        delay: 250,
        task: function () {
          yourDrone.tiltLeft();
          yourDrone.up(30,15);
        }
      },
      {
        delay: 250,
        task: function () {
          yourDrone.down(30,15);
        }
      },
      {
        delay: 250,
        task: function () {
          yourDrone.land();
        }
      }
      ]);
  });
});
