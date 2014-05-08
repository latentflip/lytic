var tracking = require('../lytic');
var uservoicePreamble = require('./libs/uservoice-preamble');

/*
 * UserVoice, configuration:
 * require('tracking/services/uservoice').configure({
 *   key: "<your uservoice key>"
 * })
 */

module.exports.configure = function (config) {
    var UserVoice = uservoicePreamble.init(config.key);

    var identify = function (userId, userData) {
        var data = {};
        data.id = userId;
        // if (userData.email) data.email = userData.email;
        // if (userData.name) data.name = userData.name;

        UserVoice.push(['identify', data]);
    };

    var track = function (event, data) {
        //No-op for uservoice
    };

    tracking._addTracker('uservoice', {
        identify: identify,
        track: track
    });
};
