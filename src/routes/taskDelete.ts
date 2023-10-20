import type { FastifyReply, FastifyRequest } from 'fastify';
import { database } from '.';

interface RequestDeleteParams {
  id: string;
}

export const taskDelete = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as RequestDeleteParams;

  const isInvalidId = await database.validator(id);

  if (isInvalidId) {
    return reply.status(404).send();
  }

  database.delete(id);

  return reply.status(204).send();
};
