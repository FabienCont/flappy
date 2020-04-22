const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

    'entry': ['./sources/index.js'],
    'mode': 'none',
    'module': {

        'rules': [

            {
                'test': /\.js$/,
                'use': [

                    {
                        'loader': 'babel-loader',
                        'options': {

                            'presets': [

                                '@babel/preset-env'
                            ]
                        }
                    }
                ]
            },
            {
                'test': /\.mp3|\.png$/,
                'use': [

                    {
                        'loader': 'url-loader'
                    }
                ]
            }
        ]
    },
    'output': {

        'path': path.resolve(__dirname, 'dist/'),
        'filename': 'index.js'
    },
    'resolve': {

        'alias': {


            'models': path.resolve(__dirname, 'sources/game/models/'),
            'assets': path.resolve(__dirname, 'sources/game/assets/'),
            /*'components': path.resolve(__dirname, 'sources/game/models/components/'),
            'entities': path.resolve(__dirname, 'sources/game/models/entities/'),*/
            'scenes': path.resolve(__dirname, 'sources/game/scenes/'),
            'systems': path.resolve(__dirname, 'sources/game/models/systems/'),
            'debug': path.resolve(__dirname, 'sources/debug'),

            'core': path.resolve(__dirname, 'sources/theatre/core/'),
            'modules': path.resolve(__dirname, 'sources/theatre/modules/')
        }
    },
    'plugins': [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        'title': 'Output Management',
        'template': 'index.html'
      }),
    ],
};
