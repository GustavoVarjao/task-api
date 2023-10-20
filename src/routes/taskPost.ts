import type { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidV4 } from 'uuid';
import { Database } from '../database/database';

interface RequestPostBody {
  title: string;
  description: string;
  createdAt: string;
}

const database = new Database();

export const taskPost = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { title, description, createdAt } = request.body as RequestPostBody;

  const task = {
    id: uuidV4(),
    title,
    description,
    createdAt,
    updatedAt: null,
    completedAt: null,
  };

  database.insert(task);

  return reply.status(201).send();
};
