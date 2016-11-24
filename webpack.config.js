const path = require('path');

module.exports = {
  entry: [
    path.join(__dirname, 'src'),
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
    }],
  },
  resolve: {
    extensions: ['.js'],
  },
  target: 'web',
};
