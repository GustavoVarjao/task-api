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
        createdAt: null,
      };

      database.insert(task);

      return res.writeHead(201).end();
    },
  },
  {
    method: 'GET',
    path: '/tasks',
    handler(req, res) {
      return res.writeHead(200).end();
    },
  },
];
