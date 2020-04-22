const path = require('path');


module.exports = ({ config }) => {

  config.resolve.alias = {
      'debug': path.resolve(__dirname, '../sources/debug'),
      'vue': 'vue/dist/vue.js'
  }

  return config ;
};
