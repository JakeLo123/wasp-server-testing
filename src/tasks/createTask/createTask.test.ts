import { describe, expect, it } from "vitest";

import { Task, User } from "wasp/entities";
import { HttpError } from "wasp/server";

import createTaskHandler from "./createTaskHandler";

function generateUser(data: Partial<User>): User {
  return {
    id: 1,
    ...data,
  };
}

describe("createTaskHandler", () => {
  it("Throws `401` if no user is present", () => {
    expect(() => {
      createTaskHandler({
        user: undefined,
        creationData: { description: "" },
      });
    }).toThrow(new HttpError(401));
  });
  it("Returns the correct data for prisma to consume", () => {
    const user = generateUser({});
    const creationArgs = createTaskHandler({
      user,
      creationData: { description: "a new task" },
    });
    expect(creationArgs).toEqual({
      data: {
        description: "a new task",
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  });
});
