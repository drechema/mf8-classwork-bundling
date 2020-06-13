const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  stats: "errors-only",
  plugins: [
    new dotenv({
      path: "./environment/development.env"
    })
  ]  
});