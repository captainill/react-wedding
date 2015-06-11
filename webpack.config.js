var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');


module.exports = {
  entry: [
    './src/client',
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
};
