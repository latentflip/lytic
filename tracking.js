var mixpanel = require('mixpanel-browserify');
var configured = false;
var trackers = {};

function ensureConfigured () {
    if (!configured) throw new Error("tracking module must be configured with `require('tracking').configure(config)`");
}

function configure (config) {
    configured = true;

    if (config.mixpanel) {
        mixpanel.init(config.mixpanel.key);
        trackers.mixpanel = mixpanel;
    }
}

function identify (userId, userData) {
    ensureConfigured();
    if (trackers.mixpanel) {
        mixpanel.identify(userId);
        mixpanel.people.set(userData);
    }
}

function track (event, data) {
    ensureConfigured();
    if (trackers.mixpanel) {
        mixpanel.track(event, data || {});
    }
}

module.exports = {
    configure: configure,
    track: track,
    identify: identify
};
