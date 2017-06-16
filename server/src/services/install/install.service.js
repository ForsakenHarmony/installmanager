// Initializes the `install` service on path `/install`
const createService = require('./install.class.js');
const hooks = require('./install.hooks');
const filters = require('./install.filters');

module.exports = function installService() {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'install',
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('/install', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('install');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
