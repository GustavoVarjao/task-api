import type { FastifyReply, FastifyRequest } from 'fastify';
import { database } from '.';

interface RequestPatchParams {
  id: string;
}

interface RequestPatchBody {
  completedAt: string;
}

export const taskPatch = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as RequestPatchParams;
  const { completedAt } = request.body as RequestPatchBody;

  const isInvalidId = await database.validator(id);

  if (isInvalidId) {
    return reply.status(404).send();
  }

  database.complete(id, completedAt);

  return reply.status(204).send();
};
