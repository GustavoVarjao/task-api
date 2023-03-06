import { randomUUID } from 'node:crypto';
import { Database } from '../database/database.js';
import { buildRoutePath } from '../middlewares/build-route-path.js';

const database = new Database();

export const routes = [
  {
    method: 'POST',
    path: '/tasks',
    handler(req, res) {
      const { title, description, createdAt } = req.body;

      const task = {
        id: randomUUID(),
        title,
        description,
        createdAt,
        updatedAt: null,
        completedAt: null,
      };

      database.insert(task);

      return res.writeHead(201).end();
    },
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    async handler(req, res) {
      const search = {
        title: req.query,
        description: req.query,
        createdAt: req.query,
      };

      const tasks = await database.select(req.query ? search : null);

      return res.writeHead(200).end(tasks);
    },
  },
  {
    method: 'DELETE',
    path: '/tasks/:id',
    handler(req, res) {},
  },
];
