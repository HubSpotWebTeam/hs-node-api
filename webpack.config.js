const webpack = require('webpack');
const path = require('path');
const libraryName = 'hs-api';
const outputFile = `${libraryName}.js`;

const config = {
  entry: path.resolve(__dirname, './src/index.js'),
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [{
      test: /(\.jsx|\.js)$/,
      loader: 'babel-loader',
      exclude: /(node_modules|bower_components)/
    }]
  },
  externals: {
    fs: '{}',
    tls: '{}',
    net: '{}',
    console: '{}'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.sass', '.png'],
    modules: [
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './src/components'),
      'node_modules'
    ]
  }
};

module.exports = config;
