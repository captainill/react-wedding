/* @flow weak */

require('babel/register')({
  ignore: /node_modules\/(?!react-router)/,
  stage: 0
});

"use strict";

// This little dev server is basically a wrapped express server that
// 'hot loads' our javascript for super fast live reload in development
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.dev');
var config = require('./env/config');

var port = process.env.HOT_LOAD_PORT || config.webpack.dev.port;

new WebpackDevServer(webpack(webpackConfig), {
  contentBase: 'http://localhost:' + port,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  hot: true
}).listen(port, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Hot load server listening at localhost:' + port);
});
