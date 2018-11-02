const merge = require('webpack-merge');
const common = require('./webpack.common.js');

 module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',

     //dev-server configuration
   devServer: {
     contentBase: './src'
  }
});