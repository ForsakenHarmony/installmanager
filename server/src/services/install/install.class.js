/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
  }
  
  find(params) {
    return Promise.resolve([]);
  }
  
  create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current)));
    }
    
    return Promise.resolve(data);
  }
}

module.exports = opts => new Service(opts);
module.exports.Service = Service;
