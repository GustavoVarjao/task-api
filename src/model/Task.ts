import { type InferSchemaType, Schema, model } from 'mongoose';

const taskSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String },
  completedAt: { type: String, default: '' },
});

export type Task = InferSchemaType<typeof taskSchema>;
export const TaskModel = model<Task>('tasks', taskSchema);
