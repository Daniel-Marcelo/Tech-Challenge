const path = require("path");

module.exports = {
    mode: 'development',
    entry: ['@babel/polyfill',"./src/js/index.js"],
    output: {
      path: path.resolve(__dirname, "public/js"),
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: 
          ['babel-loader']
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        }
      ]
    },
  };