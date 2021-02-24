const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { config, settings, srcFile } = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(config, {
  mode: 'production',
  output: {
    path: settings.distPath,
    filename: '[name].[fullhash].bundle.js'
  },
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
      new HtmlWebpackPlugin({
        title: 'Matrix',
        template: srcFile('assets/main.html'),
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      }),
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[fullhash].css' }),
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin()
  ],
  module: {
    rules: [
      {
        test:/\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  }
})