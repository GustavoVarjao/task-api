import { randomUUID } from 'node:crypto';
import { Database } from '../database/database';
import { buildRoutePath } from '../utils/buildRoutePath';

const database = new Database();

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
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
      const { search } = req.query;

      const searchObj = {
        title: search,
        description: search,
        createdAt: search,
      };

      const tasks = await database.select(search ? searchObj : null);

      return res.writeHead(200).end(tasks);
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    async handler(req, res) {
      const { id } = req.params;

      const isInvalidId = await database.validator(id);

      if (isInvalidId) {
        return res.writeHead(404).end();
      }

      database.delete(id);

      return res.writeHead(204).end();
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    async handler(req, res) {
      const { id } = req.params;

      const isInvalidId = await database.validator(id);

      if (isInvalidId) {
        return res.writeHead(404).end();
      }

      database.update(id, req.body);

      return res.writeHead(204).end();
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    async handler(req, res) {
      const { id } = req.params;
      const { completedAt } = req.body;

      const isInvalidId = await database.validator(id);

      if (isInvalidId) {
        return res.writeHead(404).end();
      }

      database.complete(id, completedAt);

      return res.writeHead(204).end();
    },
  },
];
