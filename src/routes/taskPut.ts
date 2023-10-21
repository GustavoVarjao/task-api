import type { FastifyReply, FastifyRequest } from 'fastify';
import type { RequestBody, RequestParams } from '../model/RequestData';
import { database } from '.';

export const taskPut = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as RequestParams;

  const isInvalidId = await database.validator(id);

  if (isInvalidId) {
    return reply.status(404).send();
  }

  database.update(id, request.body as RequestBody);

  return reply.status(204).send();
};
