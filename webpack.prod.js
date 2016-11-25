const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    path.join(__dirname, 'src/index.js'),
  ],
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/build',
    filename: 'kanawana.min.js',
  },
  module: {
    loaders: [{
      exclude: [
        /node_modules/,
      ],
      loader: 'babel',
    }],
  },
  target: 'web',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
  ],
};
