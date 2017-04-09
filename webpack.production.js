const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const OccurrenceOrderPlugin = webpack.optimize.OccurrenceOrderPlugin;

const env = process.env.NODE_ENV;
const libraryName = 'kanawana';
const plugins = [];
let outputFile;

if (env === 'production') {
  plugins.push(
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
    }),
    new OccurrenceOrderPlugin(),
    new UglifyJsPlugin({
      minimize: true,
      output: {
        comments: false,
      },
      compressor: {
        warnings: false,
      },
    })
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
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '!test.js'],
  },
  plugins,
};


module.exports = config;
