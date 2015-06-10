import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';

import config from './env/config';

let app_dir = '../assets';

export default {
  entry: [
    `webpack-dev-server/client?http://${config.http.host}:${config.webpack.dev.port}`,
    'webpack/hot/dev-server',
    './client.js',
  ],

  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'client.js',
    publicPath: `http://${config.http.host}:${config.webpack.dev.port}/assets`,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
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
      { test: /\.(js|jsx)$/, exclude: /node_modules\/(?!react-router)/, loader: 'react-hot!babel-loader?stage=0' },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
                    // activate source maps via loader query
                    'css?' +
                    'root=' + app_dir + // Allows root relative paths in SASS
                    '!sass?'
                )
      },
      {
        test: require.resolve('react'),
        loader: 'expose?React' },
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
      ,{
        test: /\.(jpe?g$|gif|png)$/,
        loader: 'file'
      },
    ],
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.node']
  },

  devtool: 'source-map',
};
