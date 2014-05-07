var trackers = {};

function identify (userId, userData) {
    Object.keys(trackers).forEach(function (trackerName) {
        var tracker = trackers[trackerName];
        if (tracker.identify) {
            tracker.identify(userId, userData);
        }
    });
}

function track (event, data) {
    Object.keys(trackers).forEach(function (trackerName) {
        var tracker = trackers[trackerName];
        if (tracker.track) {
            tracker.track(event, data || {});
        }
    });
}

module.exports = {
    _addTracker: function (name, tracker) {
        if (trackers[name]) throw new Error('Already have a tracker with name "' + name);

        trackers[name] = tracker;
    },
    _removeTracker: function (name) {
        delete trackers[name];
    },
    track: track,
    identify: identify
};
