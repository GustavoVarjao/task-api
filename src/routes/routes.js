import { randomUUID } from 'node:crypto';
import { Database } from '../database/database.js';

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
    path: '/tasks',
    async handler(req, res) {
      const tasks = await database.select();

      return res.writeHead(200).end(tasks);
    },
  },
];
