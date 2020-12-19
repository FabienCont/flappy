const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    app: {
      import: './sources/index.js',
      dependOn: 'theatre',
    },
    editor: {
      import: './sources/editor/frontend/index.js',
      dependOn: 'theatre',
    },
    theatre: './sources/theatre/core/theatre.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].bundle.js',
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
              implementation: require('sass'),
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
      models: path.resolve(__dirname, 'sources/game/models/'),
      assets: path.resolve(__dirname, 'sources/game/assets/'),
      components: path.resolve(__dirname, 'sources/game/models/components/'),
      entities: path.resolve(__dirname, 'sources/game/models/entities/'),
      scenes: path.resolve(__dirname, 'sources/game/scenes/'),
      systems: path.resolve(__dirname, 'sources/game/models/systems/'),
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
      template: 'sources/game/index.html',
      filename: 'index.html',
      excludeChunks: ['editor', 'debug'],
    }),
    new HtmlWebpackPlugin({
      title: 'Theatre editor',
      template: 'sources/editor/editor.html',
      filename: 'editor.html',
      excludeChunks: ['app', 'debug'],
    }),
  ],
};
