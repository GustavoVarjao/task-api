import type { FastifyReply, FastifyRequest } from 'fastify';
import type { RequestBody, RequestParams } from '../model/RequestData';
import { database } from '.';
export const taskPatch = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as RequestParams;
  const { completedAt } = request.body as RequestBody;

  const isInvalidId = await database.validator(id);

  if (isInvalidId) {
    return reply.status(404).send();
  }

  database.complete(id, completedAt);

  return reply.status(204).send();
};
