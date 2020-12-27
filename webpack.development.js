const { merge } = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(require('./webpack.common.js'), {
  entry: {
    debug: {
      import: './sources/debug/index.js',
      dependOn: 'theatre',
    },
    theatre: './sources/theatre/core/theatre.js',
  },
  devServer: {
    clientLogLevel: 'warning',
    contentBase: path.resolve(__dirname, 'dist/'),
    hot: true,
    open: false,
    poll: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    port: 8888,
    watchContentBase: true,
  },
  devtool: 'inline-source-map',
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin(),
    new HtmlWebpackPlugin({
      title: 'Game Debug',
      template: 'sources/debug/debug.html',
      filename: 'debug.html',
      inject: true,
      excludeChunks: ['editor'],
    }),
  ],
});
