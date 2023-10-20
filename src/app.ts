//import http from 'node:http';
import process from 'node:process';
import fastify from 'fastify';
import { fastifyCors } from '@fastify/cors';
// import { extractQueryParams } from './utils/extractQueryParams';
// import { json } from './middlewares/json';
// import { routes } from './routes/routes';
import { buildRoutes } from './routes';

export const app = fastify({ logger: true });

app.register(fastifyCors, {
  origin: '*',
});

buildRoutes(app);

// const server = http.createServer(async (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, DELETE, PUT, PATCH',
//   );

//   if (req.method === 'OPTIONS') {
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     return res.end();
//   }

//   const { method, url } = req;

//   await json(req, res);

//   const route = routes.find((route) => {
//     return route.method === method && route.path.test(url);
//   });

//   if (route) {
//     const routeParams = req.url.match(route.path);

//     const { query, ...params } = routeParams.groups;

//     req.params = params;
//     req.query = query ? extractQueryParams(query) : {};

//     return route.handler(req, res);
//   }

//   return res.writeHead(404).end();
// });

//server.listen(3333);

const start = async () => {
  try {
    await app.listen({ port: 3333 });
  } catch (err) {
    app.log.error(err, 'error starting server');
    process.exit(1);
  }
};
start();
