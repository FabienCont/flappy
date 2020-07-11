const path = require('path');


module.exports = ({ config }) => {

  config.resolve.alias = {
      'debug': path.resolve(__dirname, '../sources/debug'),
      'vue': 'vue/dist/vue.js'
  }
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  });
  config.module.rules.push({
    test: /\.svg/,
    use: ['raw-loader'],
    include: path.resolve(__dirname, '../'),
  });

  return config ;
};
