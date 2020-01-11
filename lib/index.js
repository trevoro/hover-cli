// @format

require('make-promises-safe');
const yargs = require('yargs');
const version = require('./version');
const update = require('./update');
const login = require('./login');

const main = () => {
  yargs
    .command(update)
    .command(login)
    .command(version)
    .demandCommand()
    .help('help')
    .version(false).argv;
};

module.exports = main;
