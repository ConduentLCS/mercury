const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const proxyMiddleware = require('http-proxy-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const historyFallback = require('connect-history-api-fallback')();
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { createServer } = require('http');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const schema = require('./schema');
const environment = require('./config/environment');
const webpackConfig = require('./build/webpack.dev.conf');

const manager = require('./lib/cluster-manager');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(environment.dev.env.NODE_ENV);
}

const server = express();

server.use('*', cors());

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context: { manager }
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: 'graphql',
  subscriptionsEndpoint: 'ws://localhost:4000/subscriptions'
}));

const ws = createServer(server);

const host = process.env.host || '0.0.0.0';
const port = process.env.port || 4000;


if (process.env.NODE_ENV === 'development') {
  const proxyTable = environment.dev.proxyTable;
  const compiler = webpack(webpackConfig);

  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
  });

  const hotMiddleware = webpackHotMiddleware(compiler, {
    log: false,
    heartbeat: 2000
  });

  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
      hotMiddleware.publish({ action: 'reload' });
      cb();
    });
  });

  Object.keys(proxyTable).forEach((context) => {
    let options = proxyTable[context];
    if (typeof options === 'string') {
      options = { target: options };
    }
    server.use(proxyMiddleware(options.filter || context, options));
  });

  server.use(historyFallback);
  server.use(devMiddleware);
  server.use(hotMiddleware);

  const staticPath = path.posix.join(
    environment.dev.assetsPublicPath,
    environment.dev.assetsSubDirectory
  );

  server.use(staticPath, express.static('./static'));

  devMiddleware.waitUntilValid(() => {
    console.log(`Server listening at http://localhost:${port}\n`);
  });
}

ws.listen(port, host, () => {
  console.log(`GraphQL server hosted at localhost:${port}/graphql`);

  new SubscriptionServer({
    execute,
    subscribe,
    schema,
    onConnect: () => ({ manager })
  }, {
    server: ws,
    path: '/subscriptions'
  });
});
