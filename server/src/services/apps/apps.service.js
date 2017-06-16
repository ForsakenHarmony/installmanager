// Initializes the `apps` service on path `/apps`
const createService = require('feathers-sequelize');
const createModel = require('../../models/apps.model');
const hooks = require('./apps.hooks');
const filters = require('./apps.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'apps',
    Model,
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('/apps', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('apps');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
