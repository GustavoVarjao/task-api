import type { FastifyInstance } from 'fastify';
import { taskGet } from './taskGet';

export const buildRoutes = (app: FastifyInstance) => {
  app.get('/tasks', taskGet);
};
