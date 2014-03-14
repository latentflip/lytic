var mixpanel = require('mixpanel-browserify');
var tracking = require('../tracking');

/*
 * Mixpanel, configuration:
 * require('tracking/services/mixpanel').configure({
 *   key: "<your mixpanel key>"
 * })
 */

module.exports.configure = function (config) {
    mixpanel.init(config.key);

    var identify = function (userId, userData) {
        mixpanel.identify(userId);
        mixpanel.people.set(userData);
    };

    var track = function (event, data) {
        mixpanel.track(event, data);
    };

    tracking._addTracker('mixpanel', {
        identify: identify,
        track: track
    });
};
