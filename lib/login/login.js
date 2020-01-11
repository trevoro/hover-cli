// @format
const opn = require('opn');
const querystring = require('querystring');
const http = require('./http');

const startMsg = `a browser window will open so you can authenticate with your
identity provider. this command will automatically finish when youre done.
press ctrl-c to cancel`;

const finishMsg = `OK! your credential were saved to ~/.hoverrc`;

const login = async () => {
  const server = http.createServer();
  const {redirectUri, address, port} = await server.start();
  const base = `http://${address}:${port}/auth/test`; // Change
  const query = querystring.encode({
    redirect_uri: redirectUri,
  });
  await opn(`${base}?${query}`);
  console.log(startMsg);
  await server.stop();
  console.log(finishMsg);
};

module.exports = {
  login,
};
