const machines = require('./machines/machines.service.js');
const apps     = require('./apps/apps.service.js');

const install = require('./install/install.service.js');

module.exports = function services() {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(machines);
  app.configure(apps);
  app.configure(install);
};
