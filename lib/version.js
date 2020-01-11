// @format
const fs = require('fs');
const path = require('path');
const package = require('../package.json');
const log = require('./log');

const base = path.normalize(path.join(__dirname));
const gitP = path.normalize(path.join(base, '../.git'));

const readGitVersion = () => {
  const rev = fs.readFileSync(path.join(gitP, 'HEAD')).toString();
  if (rev.indexOf(':') === -1) {
    return rev;
  }
  const f = rev.substring(5).trim();
  return fs
    .readFileSync(path.join(gitP, f))
    .toString()
    .substring(0, 8)
    .trim();
};

const version = (() => {
  try {
    return readGitVersion();
  } catch (e) {
    if (package.version) {
      return package.version;
    } else {
      return 'SNAPSHOT';
    }
  }
})();

const handler = () => {
  log.info(`version: ${version}`);
};

module.exports = {
  command: 'version',
  describe: 'show version',
  handler,
  version,
};
