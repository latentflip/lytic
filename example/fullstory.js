var lytic = require('../');
require('../services/fullstory').configure({ org: '', debug: true });

lytic.identify('its-me-mario')
