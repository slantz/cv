'use strict';

var webpack = require('webpack');
var config = require('./webpack.config.base.js');

if (process.env.NODE_ENV !== 'test') {
  config.entry = [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server',
    'react-hot-loader/patch'
  ].concat(config.entry);
}

config.devtool = '#cheap-module-eval-source-map';

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin()
]);

config.module.rules = config.module.rules.concat([
  {test: /\.jsx?$/, loaders: [ 'babel-loader'], exclude: /node_modules/}
]);

module.exports = config;
