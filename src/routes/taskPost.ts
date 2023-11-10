import type { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidV4 } from 'uuid';
import type { RequestBody } from '../model/RequestData';
import { TaskModel } from '../model/Task';

export const taskPost = async (
  request: FastifyRequest<{
    Body: RequestBody;
  }>,
  reply: FastifyReply,
) => {
  const { title, description, createdAt } = request.body;

  await TaskModel.create({
    id: uuidV4(),
    title,
    description,
    createdAt,
  });

  return reply.status(201).send();
};
