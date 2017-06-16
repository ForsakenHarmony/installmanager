module.exports = (isProd) => {
  const targets = isProd
    ? { browsers: ['last 2 versions'] }
    : { browsers: ['chrome 59'] };
  
  const babelrc = {
    presets: [
      [
        'env',
        {
          modules: false,
          exclude: ['transform-regenerator', 'transform-async-to-generator'],
          targets,
        },
      ],
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-object-rest-spread',
      'transform-class-properties',
      ['transform-react-jsx', { pragma: 'h' }],
    ],
    babelrc: false,
  };
  
  // if (isProd) {
  //   babelrc.plugins.push('fast-async');
  // }
  
  return babelrc;
};
