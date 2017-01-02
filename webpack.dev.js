const path = require('path');

const libraryName = 'kanawana';
const outputFile = `${libraryName}.js`;

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index'),
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'lib'),
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
    modules: ['src', 'node_modules'],
    extensions: ['.js', '!test.js'],
  },
};
