const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = merge(require('./webpack.common.js'), {
  entry: ['./sources/debug/index.js'],
  module: {
    rules: [
      // ... other rules
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          /* config.module.rule('svg').use('file-loader') */
          {
            loader: 'raw-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.js', // 'vue/dist/vue.common.js' for webpack 1
    },
  },
  devServer: {

    clientLogLevel: 'warning',
    contentBase: path.resolve(__dirname, 'dist/'),
    hot: true,
    open: false,
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
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin(),
  ],
});
