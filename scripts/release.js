/* eslint global-require: 0 */
const fs = require('fs');
const path = require('path');
const { exec, exit, rm, cp, test } = require('shelljs');
const chalk = require('chalk');
const { flowRight: compose } = require('lodash');
const readline = require('readline-sync');
const semver = require('semver');
const glob = require('glob');

const BIN = './node_modules/.bin';

const {
  PACKAGES_SRC_DIR,
  PACKAGES_OUT_DIR,
  getPackageNames,
} = require('./getPackageNames');

const BASE_PACKAGE_LOC = '../src/basePackage.json';

const consoleLog = console.log.bind(console); // eslint-disable-line no-console
const log = compose(consoleLog, chalk.bold);
const logSuccess = compose(consoleLog, chalk.green.bold);
const logError = compose(consoleLog, chalk.red.bold);

const writeFile = (filepath, string) => (
  fs.writeFileSync(filepath, string, 'utf8')
);

try {
  if (exec('git diff-files --quiet').code !== 0) {
    logError(
      'You have unsaved changes in the working tree. ' +
      'Commit or stash changes before releasing.'
    );
    exit(1);
  }

  const packageNames = getPackageNames();

  let packageName = readline.question('Name of package to release: ');

  while (!packageNames.includes(packageName)) {
    packageName = readline.question(
      `The package "${packageName}" does not exist in this project. ` +
      'Choose again: '
    );
  }

  const versionLoc = path.resolve(PACKAGES_SRC_DIR, packageName, 'VERSION');
  const version = fs.readFileSync(versionLoc, 'utf8').trim();

  let nextVersion = readline.question(
    `Next version of ${packageName} (current version is ${version}): `
  );

  while (!(
    !nextVersion ||
    (semver.valid(nextVersion) && semver.gt(nextVersion, version))
  )) {
    nextVersion = readline.question(
      `Must provide a valid version that is greater than ${version}, ` +
      'or leave blank to skip: '
    );
  }

  log('Running tests...');

  if (exec('npm run lint:src && npm test').code !== 0) {
    logError(
      'The test command did not exit cleanly. Aborting release.'
    );
    exit(1);
  }

  logSuccess('Tests were successful.');

  const sourceDir = path.resolve(PACKAGES_SRC_DIR, packageName);
  const outDir = path.resolve(PACKAGES_OUT_DIR, packageName);

  log('Cleaning destination directory...');
  rm('-rf', outDir);

  log('Compiling source files...');
  const sourceFiles = glob.sync(`${sourceDir}/**/*.js`, {
    ignore: [
      `${sourceDir}/node_modules/**/*.js`,
      `${sourceDir}/__tests__/**/*.js`,
    ],
  }).map((to) => path.relative(sourceDir, to));

  exec(
    `cd ${sourceDir} && ` +
    'cross-env BABEL_ENV=cjs ' +
    `${path.resolve(BIN)}/babel ${sourceFiles.join(' ')} ` +
    `--out-dir ${path.resolve(outDir)}`
  );

  log('Copying additional project files...');
  const additionalProjectFiles = [
    'README.md',
    'LICENSE',
    '.npmignore',
  ];
  additionalProjectFiles.forEach((filename) => {
    const src = path.resolve(filename);

    if (!test('-e', src)) return;

    cp('-Rf', src, outDir);
  });

  log('Generating package.json...');
  const packageConfig = Object.assign(
    { name: packageName, version: nextVersion },
    require(BASE_PACKAGE_LOC),
    require(path.resolve(sourceDir, 'package.json'))
  );

  writeFile(
    path.resolve(outDir, 'package.json'),
    JSON.stringify(packageConfig, null, 2)
  );

  log(`Building ${packageName}...`);
  const runRollup = (build) =>
    'cross-env BABEL_ENV=rollup rollup --config scripts/rollup.config.js ' +
    `--environment BUILD:${build},PACKAGE_NAME:${packageName}`;
  if (exec([
    runRollup('es'),
    runRollup('cjs'),
    runRollup('umd'),
    runRollup('min'),
  ].join(' && ')).code !== 0) {
    exit(1);
  }

  log(`About to publish ${packageName}@${nextVersion} to npm.`);
  if (!readline.keyInYN('Sound good? ')) {
    log('OK. Stopping release.');
    exit(0);
  }

  log('Publishing...');
  if (exec(`cd ${outDir} && npm publish`).code !== 0) {
    logError('Publish failed. Aborting release.');
    exit(1);
  }

  logSuccess(`${packageName}@${nextVersion} was successfully published.`);

  log('Updating VERSION file...');
  writeFile(versionLoc, `${nextVersion}\n`);

  log('Committing changes...');
  const newTagName = `v${nextVersion}`;
  exec(`git add ${versionLoc}`);
  exec(`git commit -m "${packageName} ${newTagName}"`);

  log(`Tagging release... (${newTagName})`);
  exec(`git tag ${newTagName}`);

  log('Pushing to GitHub...');
  exec('git push');
  exec('git push --tags');

  // kanawana specific
  if (packageName === 'kanawana') {
    log('Publishing demo and docs to github pages.');
    const browserPackage = path.resolve(outDir, 'browser', `${packageName}.min.js`);
    if (!test('-e', browserPackage)) return;
    cp('-Rf', browserPackage, path.resolve('gh-pages/demo'));
    if (exec('git push origin `git subtree split --prefix gh-pages master`:gh-pages --force').code !== 0) {
      logError('Publish github pages failed.');
      exit(1);
    }
    logSuccess('Published github pages');
  }
  // kanawana end

  logSuccess('Done.');
} catch (error) {
  logError('Release failed due to an error', error);
}
