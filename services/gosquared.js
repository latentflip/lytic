/* global _gs */
var tracking = require('../lytic');

/*
 * Mixpanel, configuration:
 * require('lytic/services/gosquared').configure({
 *   key: "<your gosquared key>",
 *   cookieDomain: "<cookie domain>",
 *   autoTrack: "<whether to automatically start tracking>"
 * })
 */

module.exports.configure = function (config) {
    require('./libs/gosquared-preamble.js').init();

    var autoTrack;

    if (typeof config.autoTrack === 'undefined') {
        autoTrack = true;
    } else {
        autoTrack = !!config.autoTrack;
    }

    _gs(config.key, autoTrack);

    if (config.trackLocal) {
        _gs('set', 'trackLocal', true);
    }

    if (config.cookieDomain) {
        _gs('set', 'cookieDomain', config.cookieDomain);
    }

    var identify = function (userId, userData) {
        _gs('set', userId);
        _gs('set', 'visitor', userData);
    };

    var pageView = function (url, title) {
        console.log('Tracking', url, title);
        _gs('track', url, title);
    };

    var track = function (event, data) {
        _gs('event', event, data);
    };

    tracking._addTracker('gosquared', {
        identify: identify,
        pageView: pageView
    });
};
