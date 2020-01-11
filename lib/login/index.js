// @format
const log = require('../log');
const {login} = require('./login');

const command = 'login';
const describe = 'auth with your identity provider';

const handler = async () => {
  await login();
};

module.exports = {
  command,
  describe,
  handler,
};
