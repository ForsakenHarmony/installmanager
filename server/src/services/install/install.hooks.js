module.exports = {
  before: {
    all   : [],
    create: [
      (hook) => {
        if (hook.data.machineid === undefined || hook.data.apps === undefined) {
          throw new Error('Missing machineid or apps');
        }
      },
    ],
  },
  
  after: {
    all   : [],
    create: [],
  },
  
  error: {
    all   : [],
    create: [],
  },
};
