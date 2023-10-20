import type { FastifyReply, FastifyRequest } from 'fastify';
import { database } from '.';

interface RequestGetQuery {
  search: string;
}

export const taskGet = async (request: FastifyRequest, reply: FastifyReply) => {
  const { search } = request.query as RequestGetQuery;

  const searchObj = {
    title: search,
    description: search,
    createdAt: search,
  };

  const tasks = await database.select(search ? searchObj : null);

  return reply.status(200).send(tasks);
};
