import { AuthRepositories } from "@/protocols";
import { SignIn, SignUp } from "@/schemas";
import { PrismaClient, Sessions, Users } from "@prisma/client";

export function createAuthRepositories(prisma: PrismaClient): AuthRepositories {
  const users = prisma.users;
  const sessions = prisma.sessions;

  return {
    createUser,
    findUser,
    findUserById,
    findUserByEmail,
    createSession,
    endSession,
    deleteUser,
    updateUser,
    findSession,
  };

  async function createUser(user: SignUp) {
    await users.create({
      data: user,
    });
  }

  async function findUser(user: SignIn): Promise<Users> {
    return await users.findFirst({
      where: {
        email: user.email,
        password: user.password,
      },
    });
  }

  async function findUserById(id: number): Promise<Users> {
    return await users.findFirst({
      where: {
        id,
      },
    });
  }

  async function findUserByEmail(email: string): Promise<boolean> {
    return !!(await users.findFirst({
      where: {
        email: email,
      },
    }));
  }

  async function createSession(userId: number, token: string) {
    await sessions.create({
      data: {
        userId,
        token,
      },
    });
  }

  async function findSession(token: string): Promise<Sessions> {
    return await sessions.findFirst({
      where: {
        token,
      },
    });
  }

  async function endSession(token: string) {
    await sessions.delete({
      where: {
        token,
      },
    });
  }

  async function deleteUser(id: number) {
    await users.delete({
      where: {
        id,
      },
    });
  }

  async function updateUser(id: number) {}
}
