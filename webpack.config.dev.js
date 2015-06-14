import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';

import config from './env/config';

let app_dir = '../assets';

export default {
  entry: [
    `webpack-dev-server/client?http://${config.http.host}:${config.webpack.dev.port}`,
    'webpack/hot/dev-server',
    './src/client',
  ],

  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'client.js',
    publicPath: `http://${config.http.host}:${config.webpack.dev.port}/assets`,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('style.css'),
    new webpack.IgnorePlugin(/vertx/)
  ],

  node: {
    tls: 'empty',
    net: 'empty',
    fs: 'empty'
  },

  resolve: {
    extensions: [ '', '.js', '.jsx', '.node', '.json' ]
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!react-router)/,
        loader: 'react-hot!babel-loader?stage=0'
      },
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
        loader: 'expose?React'
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
      {
        test: /\.js$/,
        include: /node_modules\/bootstrap/,
        loader: 'imports?jQuery=jquery'
      },
      {
        test: /\.(jpe?g$|gif|png)$/,
        loader: 'file-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.target.mk$/,
        loader: 'raw-loader'
      },
      {
        test: /\.node$/,
        loader: 'node-loader'
      },
      {
        test: /\.md$/,
        loader: 'html!markdown'
      }
    ],
    noParse: [
      /i18nliner\/dist\/lib\/i18nliner/
    ]
  },

  devtool: 'source-map',
};
