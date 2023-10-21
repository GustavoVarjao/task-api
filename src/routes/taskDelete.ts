import type { FastifyReply, FastifyRequest } from 'fastify';
import type { RequestParams } from '../model/RequestData';
import { database } from '.';

export const taskDelete = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as RequestParams;

  const isInvalidId = await database.validator(id);

  if (isInvalidId) {
    return reply.status(404).send();
  }

  database.delete(id);

  return reply.status(204).send();
};
