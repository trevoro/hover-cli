// @format
const {createLogger, format, transports} = require('winston');
const {combine, simple, colorize} = format;

const logLevel = () => {
  return 'info';
};

const logger = createLogger({
  format: combine(simple(), colorize()),
  transports: [new transports.Console({level: logLevel()})],
});

module.exports = logger;
