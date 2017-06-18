const { populate } = require('feathers-hooks-common');

const appFileSchema = {
  include: {
    service    : 'files',
    nameAs     : 'file',
    parentField: 'fileId',
    childField : 'id',
  },
};

module.exports = {
  before: {
    all   : [],
    find  : [],
    get   : [],
    create: [],
    update: [],
    patch : [],
    remove: [],
  },
  
  after: {
    all   : [],
    find  : [populate({ schema: appFileSchema })],
    get   : [populate({ schema: appFileSchema })],
    create: [],
    update: [],
    patch : [],
    remove: [],
  },
  
  error: {
    all   : [],
    find  : [],
    get   : [],
    create: [],
    update: [],
    patch : [],
    remove: [],
  },
};
