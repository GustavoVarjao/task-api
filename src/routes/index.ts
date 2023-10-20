import type { FastifyInstance } from 'fastify';
import { Database } from '../database/database';
import { taskGet } from './taskGet';
import { taskPost } from './taskPost';

export const database = new Database();

export const buildRoutes = (app: FastifyInstance) => {
  app.get('/tasks', taskGet);
  app.post('/tasks', taskPost)
};
