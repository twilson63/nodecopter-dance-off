var RollingSpider = require("rolling-spider");
var temporal = require("temporal");

var yourDrone = new RollingSpider();

yourDrone.connect(function() {
  yourDrone.setup(function() {
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
          yourDrone.forward();
        }
      },
      {
        delay: 500,
        task: function () {
          yourDrone.land();
        }
      }]);
  });
});