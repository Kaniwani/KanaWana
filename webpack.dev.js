const path = require('path');
const libraryName = 'kanawana';
const outputFile = `${libraryName}.js`;

module.exports = {
  entry: `${__dirname}/src/index.js`,
  devtool: 'source-map',
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
    modules: ['src', 'node_modules'],
    root: path.resolve('./src'),
    extensions: ['', '.js', '!test.js'],
  },
};
