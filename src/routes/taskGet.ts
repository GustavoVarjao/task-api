import type { FastifyReply, FastifyRequest } from 'fastify';
import { Database } from '../database/database';

interface requestQuery {
  search: string;
}

const database = new Database();

export const taskGet = async (request: FastifyRequest, reply: FastifyReply) => {
  const { search } = request.query as requestQuery;

  const searchObj = {
    title: search,
    description: search,
    createdAt: search,
  };

  const tasks = await database.select(search ? searchObj : null);

  return reply.status(200).send(tasks);
};
