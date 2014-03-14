# Generic analytics tracking wrapper

## Current builtin services:

* mixpanel

## Usage

```javascript
var tracking = require('tracking');
require('tracking/services/mixpanel').configure({
    key: "<your mixpanel key>";
});

tracking.identify("user-id", {
    name: "Phil"
});

tracking.track("played a video", {
    //optional data
    startTime: 0,
    endTime: 120
});
```

## Adding services

Services should call `tracking._addTracker(name, config)` to register themselves. You can either add services here, or application specific ones.

```javascript
//my-custom-tracker.js

var tracking = require('tracking'); //make relative if actually including in this repo

module.exports.configure = function (config) {
    //Export as a configure method for consistency

    var identify = function (userId, userData) {
        //identify will receive a userId, and a userData object

        //do something with the data
    };

    var track = function (event, data) {
        //track will receive an event name, and data object (may be empty if not provided
    };

    //Register the tracker
    tracking._addTracker('my-tracker', {
        identify: identify,
        track: track
    });
};
```

Your application will then use it like so:

```javascript
var tracking = require('tracking');
var custom = require('./my-custom-tracker');
custom.configure({
    configItem: 'stuff'
});

tracking.track('event name', {
    //data
});
```
