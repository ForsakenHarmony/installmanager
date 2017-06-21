const config = require('../config.json');

module.exports.file = config;
module.exports.host = 'http://' + config.host + ':' + config.port;
