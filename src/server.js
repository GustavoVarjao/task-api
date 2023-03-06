import http from 'node:http';
import { extractQueryParams } from './middlewares/build-route-path.js';
import { json } from './middlewares/json.js';
import { routes } from './routes/routes.js';

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find(route => {
    return route.method === method;
  });

  if (route) {
    if (method === 'GET') {
      req.query = extractQueryParams(url);
    }

    const { path, handler } = route;

    //const test = path.exec(url);

    return handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333);
