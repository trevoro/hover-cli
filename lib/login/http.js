// @format
const fs = require('fs');
const os = require('os');
const path = require('path');
const fastify = require('fastify');
const html = require('./html');

/*
 * using fastify is totally overkill for what we need it to do but I didn't
 * feel like writing it in native node until I get it working all the way.
 * After that this is a good candidate for stripping down to bare stdlib metal.
 */

const getToken = code => {
  // fetch with code
  return Promise.resolve({
    access_token: 'fake_access_token',
  });
};

const saveToken = token => {
  const home = os.homedir();
  const file = path.join(home, '.hoverrc');
  const config =
    JSON.stringify(
      {
        token: token.access_token,
      },
      null,
      2,
    ) + '\n';
  fs.writeFileSync(file, config);
};

// this is so we can inject the server into this handler
// and do testing. its sort of a weird pattern but
// our use case is also kind of odd.
const authCallback = server => {
  return async (req, res) => {
    const {code, state} = req.query;
    const token = await getToken(code);
    await saveToken(token);
    const body = html.ok;
    res.type('text/html').send(body);
    server.close();
    return;
  };
};

// this uses the same pattern as authCallback to keep things consistent.
const authTest = () => {
  return (req, res) => {
    const redirectUri = req.query['redirect_uri'];
    const body = html.test.replace('__REDIRECT_URI__', redirectUri);
    res.type('text/html').send(body);
    return;
  };
};

const createServer = () => {
  const server = fastify();
  // if you dont set this, any keepalive on a client will prevent the server
  // for closing for about 5 seconds.
  server.server.keepAliveTimeout = 1;
  server.get('/auth/callback', authCallback(server));
  server.get('/auth/test', authTest());

  const start = async () => {
    await server.listen();
    const {address, port} = server.server.address();
    const redirectUri = `http://${address}:${port}/auth/callback`;
    return {redirectUri, address, port};
  };

  // a promise that evaluates now but only resolves later in the stop method.
  // this little hack just lets us write code that intentionally blocks control
  // flow so we can do something like "await server.stop()"
  const waitForClose = new Promise(r => {
    server.addHook('onClose', () => r());
  });

  const stop = async () => {
    return waitForClose;
  };

  return {
    start,
    stop,
  };
};

module.exports = {
  getToken,
  saveToken,
  createServer,
  authCallback,
  authTest,
};
