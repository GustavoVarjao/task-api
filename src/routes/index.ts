import type { FastifyInstance } from 'fastify';
import { Database } from '../database/database';
import { taskGet } from './taskGet';
import { taskPost } from './taskPost';
import { taskDelete } from './taskDelete';

export const database = new Database();

export const buildRoutes = (app: FastifyInstance) => {
  app.get('/tasks', taskGet);
  app.post('/tasks', taskPost);
  app.delete('/tasks/:id', taskDelete);
};
