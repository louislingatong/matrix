const path = require('path');

const settings = {
  distPath: path.join(__dirname, 'dist'),
  srcPath: path.join(__dirname, 'src')
};

const srcFile = (filename) => {
  return path.join(settings.srcPath, filename)
}

const config = {
  entry: {
    main: srcFile('index.js'),
    vendor: srcFile('assets/js/main.js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test:/\.html$/,
        use: ['html-loader']
      },
      {
        test:/\.(svg|png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[fullhash].[ext]',
            outputPath: 'images'
          }
        }
      }
    ]
  }
}
{
  module.exports = {
    config,
    settings,
    srcFile
  }
}