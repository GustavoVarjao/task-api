import type { FastifyReply, FastifyRequest } from 'fastify';
import type { RequestBody, RequestParams } from '../model/RequestData';
import { TaskModel } from '../model/Task';

export const taskPut = async (
  request: FastifyRequest<{
    Params: RequestParams;
    Body: RequestBody;
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;
  const { title, description, updatedAt } = request.body;

  await TaskModel.updateOne(
    {
      id,
    },
    {
      title,
      description,
      updatedAt,
    },
  );

  return reply.status(204).send();
};
