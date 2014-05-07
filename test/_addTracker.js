var Lab = require('lab');
var tracking = require('../lytic');

Lab.experiment('_addTracker', function () {
    Lab.test('track gets called', function (done) {
        var track = function (event, data) {
            Lab.expect(event).to.equal('event-name');
            Lab.expect(data).to.equal('event-data');
            tracking._removeTracker('custom');
            done();
        };

        tracking._addTracker('custom', {
            track: track
        });

        tracking.track('event-name', 'event-data');
    });

    Lab.test('identify gets called', function (done) {
        var identify = function (userId, userData) {
            Lab.expect(userId).to.equal('user-id');
            Lab.expect(userData).to.equal('user-data');
            tracking._removeTracker('custom-2');
            done();
        };

        tracking._addTracker('custom-2', {
            identify: identify
        });

        tracking.identify('user-id', 'user-data');
    });
});
