import { type Task } from "wasp/entities";
import { HttpError } from "wasp/server";
import { type UpdateTask, type DeleteTasks } from "wasp/server/operations";

type UpdateArgs = Pick<Task, "id" | "isDone">;

export const updateTask: UpdateTask<UpdateArgs> = async (
  { id, isDone },
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Task.update({
    where: {
      id,
    },
    data: { isDone },
  });
};

export const deleteTasks: DeleteTasks<Task["id"][]> = async (
  idsToDelete,
  context
) => {
  return context.entities.Task.deleteMany({
    where: {
      id: {
        in: idsToDelete,
      },
    },
  });
};
