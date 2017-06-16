const webpack        = require('webpack');
const ExtractText    = require('extract-text-webpack-plugin');
const OptimizeCss    = require('optimize-css-assets-webpack-plugin');
const HTML           = require('html-webpack-plugin');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const uglify = require('./uglify');

module.exports = (isProd) => {
  // base plugins array
  const plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new ExtractText({
      filename: 'styles.[hash].css',
      disable : !isProd,
    }),
    new webpack.ProvidePlugin({
      h: ['preact', 'h'],
    }),
    new HTML({ template: 'src/index.html' }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ];
  
  if (isProd) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
      new OptimizeCss({
        cssProcessorOptions: { discardComments: { removeAll: true } },
      }),
      new webpack.optimize.UglifyJsPlugin(uglify),
      new BundleAnalyzer()
    );
  } else {
    // dev only
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    );
  }
  
  return plugins;
};
