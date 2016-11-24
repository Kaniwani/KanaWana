const path = require('path');

module.exports = {
  entry: [
    path.join(__dirname, 'src/index.js'),
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'kanawana.js',
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
    }],
  },
  target: 'web',
};
