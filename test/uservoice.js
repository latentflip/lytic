var Lab = require('lab');
var sinon = require('sinon');
var tracking = require('../lytic');

Lab.experiment('UserVoice', function () {
    var mockUserVoice, preamble;

    Lab.beforeEach(function (done) {
        mockUserVoice = [];
        preamble = require('../services/libs/uservoice-preamble');
        sinon.stub(preamble, 'init').returns(mockUserVoice);
        done();
    });

    Lab.afterEach(function (done) {
        preamble.init.restore();
        done();
    });

    Lab.test('It should identify users', function (done) {
        require('../services/uservoice').configure({ key: '1234' });

        tracking.identify('123', {
            name: 'Phil Roberts',
            email: 'phil@example.com',
            other: 'junk'
        });

        Lab.expect(mockUserVoice[0]).to.deep.equal(['identify', {
            id: '123',
            name: 'Phil Roberts',
            email: 'phil@example.com'
        }]);

        done();
    });
});
