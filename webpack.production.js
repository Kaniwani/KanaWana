const webpack = require('webpack');
const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const DedupePlugin = webpack.optimize.DedupePlugin;
const OccurrenceOrderPlugin = webpack.optimize.OccurrenceOrderPlugin;

const env = process.env.WEBPACK_ENV;
const libraryName = 'kanawana';
const plugins = [];
let outputFile;

if (env === 'production') {
  plugins.push(
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
    }),
    new DedupePlugin(),
    new UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new OccurrenceOrderPlugin(),
  );
  outputFile = `${libraryName}.min.js`;
} else {
  outputFile = `${libraryName}.js`;
}

const config = {
  entry: `${__dirname}/src/index.js`,
  output: {
    path: `${__dirname}/lib`,
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    loaders: [
      {
        exclude: [/node_modules/],
        loader: 'babel',
      },
    ],
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '!test.js'],
  },
  plugins,
};


module.exports = config;
