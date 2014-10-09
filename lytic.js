var trackers = {};

function identify (userId, userData) {
    userData = userData || {};
    Object.keys(trackers).forEach(function (trackerName) {
        var tracker = trackers[trackerName];
        if (tracker.identify) {
            tracker.identify(userId, userData);
        }
    });
}

function track (event, data) {
    data = data || {};
    Object.keys(trackers).forEach(function (trackerName) {
        var tracker = trackers[trackerName];
        if (tracker.track) {
            tracker.track(event, data);
        }
    });
}

function pageView (url, title) {
    url = url || window.location.toString();
    title = title || document.title;

    Object.keys(trackers).forEach(function (trackerName) {
        var tracker = trackers[trackerName];
        if (tracker.pageView) {
            tracker.pageView(url, title);
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
    identify: identify,
    pageView: pageView
};
