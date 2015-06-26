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

    var start = [
      {
        delay: 0,
        task: function () {
          yourDrone.flatTrim();
          yourDrone.startPing();
          yourDrone.takeOff();
        }
      },
      {
        delay: 5000,
        task: function() {
          yourDrone.forward({ steps: 25 });
        }
      },
      {
        delay: 1000,
        task: function() {
          yourDrone.backward({ steps: 25 });
        }
      },
      {
        delay: 1000,
        task: function() {
          yourDrone.forward({ steps: 25 });
        }
      },
      {
        delay: 1000,
        task: function() {
          yourDrone.tiltLeft({ steps: 25 }, function() {
            yourDrone.tiltRight({ steps: 50 }, function() {
              yourDrone.tiltLeft({ steps: 50 }, function() {
                yourDrone.tiltRight( {steps: 25} );
              });
            });
          });
        }
      }];

    var end = [{
      delay: 1000,
      task: function() {
        yourDrone.backFlip();
      }
    },
    {
      delay: 1000,
      task: function () {
        yourDrone.land();
      }
    }];

    var hokey = function() {
      function turn() {
        yourDrone.forward({ steps: 10 }, function() {
          yourDrone.clockwise({ steps: 2 });
        });

      }

      var pokey = [{
        delay: 3000,
        task: turn
      }];
      for(var i = 0; i < 50; i++) {
        pokey.push({
          delay: 100,
          task: turn
        });
      }
      return pokey;
    };

    var moves = [];

    moves = moves.concat(start);
    moves = moves.concat(hokey());
    moves = moves.concat(end);

    temporal.queue(moves);

  });
});
