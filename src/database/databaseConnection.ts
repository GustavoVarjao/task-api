import type { FastifyInstance } from 'fastify';
import { connect } from 'mongoose';

export async function databaseConnection(
  app: FastifyInstance,
  opts: { CONNECTION_URL: string },
) {
  const connection = await connect(opts.CONNECTION_URL);
  try {
    app.decorate('mongoose', connection);
    app.log.info('[PLUGIN] Mongoose');
  } catch (error) {
    app.log.error({ error }, '[PLUGIN] Error Connecting to mongodb');
    app.addHook('onClose', async () => {
      await connection.disconnect();
    });
  }
}
