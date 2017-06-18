const machines = require('./machines/machines.service.js');
const apps     = require('./apps/apps.service.js');
const install  = require('./install/install.service.js');
const files    = require('./files/files.service.js');
const uploads  = require('./uploads/uploads.service.js');

module.exports = function services() {
  const app = this;
  app.configure(machines);
  app.configure(apps);
  app.configure(install);
  app.configure(files);
  app.configure(uploads);
};
