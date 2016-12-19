const path = require('path');

module.exports = {
  entry: [
    path.join(__dirname, 'src/core.js'),
  ],
  output: {
    library: 'kanawana',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'build'),
    publicPath: '/build',
    filename: 'kanawana.js',
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
    }],
  },
};
