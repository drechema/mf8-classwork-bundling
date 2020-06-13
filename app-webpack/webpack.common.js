const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const basePath = __dirname;

module.exports = {
    context: path.join(basePath, "src"),
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
    },    
    entry: {
        app: "./index.tsx",
        appStyles: ["./styles/styles.scss"],
    },
    output: {
        // salida: nombre del fichero + hash
        filename: "[name].[chunkhash].js"
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
          },
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
          },          
          {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              {
                loader: "sass-loader",
                options: {
                  implementation: require("sass")
                }
              }
            ]
          },
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
          },
          {
            test: /\.(png|jpg|gif)$/,
            exclude: /node_modules/,
            loader: "url-loader?limit=5000"
          },
          {
            test: /\.html$/,
            loader: "html-loader"
          }          
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          filename: "index.html", // Salida a ./dist/
          template: "index.html"  // Lectura desde ./src
        }),
        new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css"
        })
      ]
  };