var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'main.min.js',
    library:'vue-line-clamp',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  performance: {
    hints: false
  },
  devtool: '#source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
//      compress: false,
//      comments: false,
      sourceMap: true
    })
  ]
}