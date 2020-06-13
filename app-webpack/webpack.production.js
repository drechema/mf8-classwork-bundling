const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  mode: "production",
  stats: "verbose",
  plugins: [
    new dotenv({
      path: "./environment/production.env"
    })
  ]    
});