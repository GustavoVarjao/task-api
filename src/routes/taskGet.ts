import type { FastifyReply, FastifyRequest } from 'fastify';
import type { RequestGetQuery } from '../model/RequestData';
import { TaskModel } from '../model/Task';

export const taskGet = async (
  request: FastifyRequest<{
    Querystring: RequestGetQuery;
  }>,
  reply: FastifyReply,
) => {
  const { search } = request.query;

  if (search) {
    const tasks = await TaskModel.find({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ],
    }).exec();

    return reply.status(200).send(tasks);
  }

  const tasks = await TaskModel.find();

  return reply.status(200).send(tasks);
};
