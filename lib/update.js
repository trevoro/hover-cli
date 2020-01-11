// @format
const {version} = require('./version');
const log = require('./log');

const command = 'update';
const describe = 'update cli to latest version';

const checkLatest = () => {
  return Promise.resolve('11807849');
};

const isLatest = () => {
  return checkLatest().then(latest => {
    return version === latest;
  });
};

const handler = () => {
  isLatest().then(ok => {
    if (ok) {
      log.info('already at latest version');
      return;
    } else {
      log.info('would update');
    }
  });
};

module.exports = {
  command,
  describe,
  handler,
};
