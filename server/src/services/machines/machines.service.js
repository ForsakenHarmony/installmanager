// Initializes the `machines` service on path `/machines`
const createService = require('feathers-sequelize');
const createModel = require('../../models/machines.model');
const hooks = require('./machines.hooks');
const filters = require('./machines.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'machines',
    Model,
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('/machines', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('machines');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
