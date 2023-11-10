import type { FastifyInstance } from 'fastify';
import { taskGet } from './taskGet';
import { taskPost } from './taskPost';
import { taskDelete } from './taskDelete';
import { taskPut } from './taskPut';
import { taskPatch } from './taskPatch';

export const buildRoutes = (app: FastifyInstance) => {
  app.get('/tasks', taskGet);
  app.post('/tasks', taskPost);
  app.delete('/tasks/:id', taskDelete);
  app.put('/tasks/:id', taskPut);
  app.patch('/tasks/:id/complete', taskPatch);
};
