import type { FastifyReply, FastifyRequest } from 'fastify';
import type { RequestBody, RequestParams } from '../model/RequestData';
import { TaskModel } from '../model/Task';

export const taskPatch = async (
  request: FastifyRequest<{
    Params: RequestParams;
    Body: RequestBody;
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;
  const { completedAt } = request.body;

  const task = await TaskModel.find({
    id,
  });

  if (task[0].completedAt) {
    await TaskModel.updateOne({ id }, { $unset: { completedAt: 1 } });

    return reply.status(204).send();
  }

  await TaskModel.updateOne(
    {
      id,
    },
    {
      completedAt,
    },
  );

  return reply.status(204).send();
};
