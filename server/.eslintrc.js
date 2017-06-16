const ENV = process.env.NODE_ENV || 'development';

// this is a custom config, it reflects my own preferences ( you should probably not use it)
module.exports = {
  'extends': ['xo-space/esnext'],
  'env'    : {
    'node': true,
    'es6' : true,
  },
  'globals': {
    'ENV': true,
  },
  'rules'  : {
    'no-debugger': ENV === 'development' ? 'off' : 'error',
    
    'comma-dangle'      : [
      'error', {
        'arrays'   : 'always-multiline',
        'objects'  : 'always-multiline',
        'imports'  : 'always-multiline',
        'exports'  : 'always-multiline',
        'functions': 'ignore'
      },
    ],
    'operator-linebreak': ['error', 'before'],
    
    'no-multi-spaces'   : 'off',
    'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
    'key-spacing'       : 'off', // should be align: colon
    
    'no-empty-pattern'    : 'off',
    'object-curly-spacing': ['error', 'always'],
    'curly'               : 'off',
    
    'capitalized-comments': 'off',
    
    'func-names'  : ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed', { 'requireForBlockBody': true }],
  }
};
