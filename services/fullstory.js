var tracking = require('../lytic');
var fullstoryPreamble = require('./libs/fullstory-preamble');

module.exports.configure = function (config) {
    fullstoryPreamble.init(config.org);

    var identify = function (userId, userData) {
        FS.identify(userId, userData || {});
    };

    tracking._addTracker('fullstory', {
        identify: identify
    });
};
