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
          yourDrone.up({speed:100,steps:10});
        }
      },
      {
        delay: 2500,
        task: function () {
          yourDrone.down({speed:100,steps:10});
        }
      },
      {
        delay: 2500,
        task: function () {
          yourDrone.up({speed:100,steps:10});
        }
      },
      {
        delay: 2500,
        task: function () {
          yourDrone.down({speed:100,steps:10});
        }
      },
      {
        delay: 2500,
        task: function () {
          yourDrone.up({speed:100,steps:20});
          yourDrone.forward({speed:100,steps:20});
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
          yourDrone.down({speed:100,steps:15});
          yourDrone.flatTrim();
        }
      },
      {
        delay: 2500,
        task: function () {
          yourDrone.tiltRight();
          yourDrone.up({speed:90,steps:8});
        }
      },
      {
        delay: 2500,
        task: function () {
          yourDrone.down({speed:90,steps:8});
          yourDrone.flatTrim();
        }
      },
      {
        delay: 2500,
        task: function () {
          yourDrone.tiltLeft();
          yourDrone.up({speed:80,steps:6});
        }
      },
      {
        delay: 2500,
        task: function () {
          yourDrone.down({speed:80,steps:6});
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
