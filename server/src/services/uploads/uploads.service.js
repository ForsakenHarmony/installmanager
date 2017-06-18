// Initializes the `uploads` service on path `/uploads`
const blob = require('feathers-blob');
const path = require('path');
const fs   = require('fs-blob-store');

const hooks   = require('./uploads.hooks');
const filters = require('./uploads.filters');

module.exports = function uploadService() {
  const app = this;
  
  const blobStorage = fs(path.join(app.get('public'), '/f'));
  
  const paginate = app.get('paginate');
  
  const options = {
    name : 'uploads',
    Model: blobStorage,
    paginate,
  };
  
  // Initialize our service with any options it requires
  app.use('/uploads', blob(options));
  
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('uploads');
  
  service.hooks(hooks);
  
  if (service.filter) {
    service.filter(filters);
  }
};
