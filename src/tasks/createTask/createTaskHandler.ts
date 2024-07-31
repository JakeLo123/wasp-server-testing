import { Task, User } from "wasp/entities";
import { HttpError } from "wasp/server";

type CreateTaskParams = {
  user?: User;
  creationData: Pick<Task, "description">;
};

export default function createTaskHandler({
  creationData,
  user,
}: CreateTaskParams) {
  if (!user) {
    throw new HttpError(401);
  }

  return {
    data: {
      ...creationData,
      user: { connect: { id: user.id } },
    },
  };
}
