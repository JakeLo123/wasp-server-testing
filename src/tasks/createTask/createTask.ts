import { type Task } from "wasp/entities";
import { HttpError } from "wasp/server";

import createTaskHandler from "./createTaskHandler";

import { type CreateTask } from "wasp/server/operations";

type CreateArgs = Pick<Task, "description">;

export const createTask: CreateTask<CreateArgs, Task> = async (
  data,
  context
) => {
  const creationArgs = createTaskHandler({
    creationData: data,
    user: context.user,
  });

  return context.entities.Task.create(creationArgs);
};
