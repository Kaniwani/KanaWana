const path = require('path');

module.exports = {
  entry: [
    path.join(__dirname, 'src/core.js'),
  ],
  output: {
    library: 'kanawana',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname),
    publicPath: '/',
    filename: 'index.js',
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
    }],
  },
};
