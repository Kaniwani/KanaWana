const path = require('path');
const nodeResolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');
const { PACKAGES_SRC_DIR, PACKAGES_OUT_DIR } = require('./getPackageNames');

const build = process.env.BUILD;
const packageName = process.env.PACKAGE_NAME;
const sourceDir = path.resolve(PACKAGES_SRC_DIR, packageName);
const outDir = path.resolve(PACKAGES_OUT_DIR, packageName);

const config = {
  entry: `${sourceDir}/index.js`,
  moduleName: packageName,
  external: [],
  plugins: [
    babel({
      exclude: [
        '**/node_modules/**',
        '**/__tests__/**',
      ],
    }),
  ],
};

if (build === 'es' || build === 'cjs') {
  config.external.push('lodash/isEmpty');
  config.dest = `${outDir}/${build}/${packageName}.js`;
  config.format = build;
}

if (build === 'umd') {
  config.dest = `${outDir}/browser/${packageName}.js`;
  config.format = 'umd';
  config.plugins.push(
    nodeResolve({
      jsnext: true,
    }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    })
  );
}

if (build === 'min') {
  config.dest = `${outDir}/browser/${packageName}.min.js`;
  config.format = 'umd';
  config.plugins.push(
    nodeResolve({
      jsnext: true,
    }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false,
      },
    })
  );
}

export default config;
