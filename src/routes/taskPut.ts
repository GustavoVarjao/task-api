import type { FastifyReply, FastifyRequest } from 'fastify';
import { database } from '.';

interface RequestPutParams {
  id: string;
}

interface RequestPutBody {
  title: string;
  description: string;
  updatedAt: string;
}

export const taskPut = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as RequestPutParams;

  const isInvalidId = await database.validator(id);

  if (isInvalidId) {
    return reply.status(404).send();
  }

  database.update(id, request.body as RequestPutBody);

  return reply.status(204).send();
};
