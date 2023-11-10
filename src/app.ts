//import http from 'node:http';
import process from 'node:process';
import fastify from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { buildRoutes } from './routes';
import { databaseConnection } from './database/databaseConnection';

export const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

app.register(databaseConnection, {
  CONNECTION_URL: process.env.CONNECTION_URL!,
});

app.register(fastifyCors, {
  origin: '*',
});

buildRoutes(app);

const start = async () => {
  try {
    await app.listen({ port: 3333 });
  } catch (err) {
    app.log.error(err, 'error starting server');
    process.exit(1);
  }
};
start();
