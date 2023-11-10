import type { FastifyReply, FastifyRequest } from 'fastify';
import type { RequestParams } from '../model/RequestData';
import { TaskModel } from '../model/Task';

export const taskDelete = async (
  request: FastifyRequest<{
    Params: RequestParams;
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;

  await TaskModel.deleteOne({
    id,
  });

  return reply.status(204).send();
};
