var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');


module.exports = {
  entry: [
    './client.js',
  ],

  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'client.js',
    publicPath: '/assets',
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.IgnorePlugin(/vertx/)
  ],

  node: {
    console: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },

  module: {
    loaders: [
      { test: /\.(js|jsx)$/, exclude: /node_modules\/(?!react-router)/, loader: 'babel-loader?stage=0' },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
                    // activate source maps via loader query
                    'css?sourceMap!' +
                    'sass?sourceMap'
                )
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.node$/,
        loader: 'node-loader'
      },
      // bootstrap
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-eot',
      },
      {
        test: /\.(woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff2',
      },
      { test: /\.js$/, include: /node_modules\/bootstrap/, loader: 'imports?jQuery=jquery' },
    ],
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.node']
  },

};
