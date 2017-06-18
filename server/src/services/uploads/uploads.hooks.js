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
    find  : [],
    get   : [],
    create: [
      (hook) => {
        return hook.app.services.files.create({
          path    : '/f/' + hook.result.id,
          filename: hook.result.id,
          local   : true,
        }).then((res) => {
          hook.result.fileId = res.id;
        });
      },
    ],
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
