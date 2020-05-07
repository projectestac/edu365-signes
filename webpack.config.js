const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  },
  performance: {
    maxEntrypointSize: 800000,
    maxAssetSize: 800000,
  },
};