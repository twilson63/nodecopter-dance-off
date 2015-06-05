# NodeCopter - DANCE OFF

![Rolling Spider](http://www.parrot.com/static/images/theme/catalog/rolling_spider/details.jpg)

## Lunch and Learn

In this weeks lunch and learn we are going to have some fun writing code! We are going to have a NodeCopter Dance Off!

## What is a NodeCopter Dance Off?

It is a competition, which each developer will create an aerial routine using the minidrone and the rolling-spider module.

You can get started reviewing the documentation here:  

https://github.com/FluffyJack/node-rolling-spider#client-api

There is a simple example:

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

## The Rules

### Build your routine:

Every developer will have 30 minutes to craft a series of aerial instructions for a MiniDrone.  The routine can not last more than a minute and should have a successful landing. You can be as creative as you want, but try to keep the drone in a 30 foot range. Bonus points if you are able to choreograph to music.

### Test your routine:

Once the 30 minutes is over, everyone must check in their code to the NodeCopter `DanceOff` repo with their name as the js file, then we will all go outside to the demonstration area and execute each persons routine using one computer. Make sure we have live stream or video stream for the event.

### Refine 

After the first one, everyone will have an additional 15 minutes to refine their routines.

### The Show

Finally, the final show in which everyone will check in their code and we will go outside and run the demos one at a time.

### The Voting

The group will vote for the best routine and the best in show, awards will be given.

### Lint your code before you check it in and make sure there are no syntax errors

    npm run lint

### Have Fun!