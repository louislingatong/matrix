const HtmlWebpackPlugin = require('html-webpack-plugin');
const { config, settings, srcFile } = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(config, {
  mode: 'development',
  output: {
    path: settings.distPath,
    filename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Matrix',
      template: srcFile('assets/main.html')
    })
  ],
  module: {
    rules: [
      {
        test:/\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  devtool: 'eval-cheap-source-map',
  devServer: {
    contentBase: settings.distPath
  }
})