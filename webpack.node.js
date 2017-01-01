const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  entry: [path.join(__dirname, 'src/core.js')],
  output: {
    library: 'kanawana',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'build'),
    publicPath: '/build',
    filename: 'kanawana.js',
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
  plugins: [
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
    }),
    new webpack.optimize.DedupePlugin(),
  ],
};
