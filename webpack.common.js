const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const sass = require('sass');

module.exports = {
  entry: {
    app: {
      import: ['./sources/index.js'],
      dependOn: 'theatre',
    },
    editor: {
      import: ['./sources/editor/frontend/index.js', 'webpack-hot-middleware/client'],
      dependOn: 'theatre',
    },
    theatre: './sources/theatre/core/theatre.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name]_bundle.js',
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ],
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
            },
          },
        ],
      },
      {
        test: /\.svg/,
        type: 'asset/source',
      },
      {
        test: /\.mp3|\.png$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      scripts: path.resolve(__dirname, 'sources/game/scripts/'),
      models: path.resolve(__dirname, 'sources/game/models/'),
      assets: path.resolve(__dirname, 'sources/game/assets/'),
      components: path.resolve(__dirname, 'sources/game/models/components/'),
      entities: path.resolve(__dirname, 'sources/game/models/entities/'),
      lifecycles: path.resolve(__dirname, 'sources/game/lifecycles/'),
      systems: path.resolve(__dirname, 'sources/game/scripts/systems/'),
      debug: path.resolve(__dirname, 'sources/debug'),
      editor: path.resolve(__dirname, 'sources/editor/'),
      core: path.resolve(__dirname, 'sources/theatre/core/'),
      modules: path.resolve(__dirname, 'sources/theatre/modules/'),
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Game',
      template: 'index.html',
      filename: 'index.html',
      excludeChunks: ['editor', 'debug'],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      title: 'Theatre editor',
      template: 'sources/editor/editor.html',
      filename: 'editor.html',
      excludeChunks: ['app', 'debug'],
      inject: true,
    }),
  ],
};
