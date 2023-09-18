import { AuthRepositories } from "@/protocols";
import { SignIn, SignUp } from "@/schemas";
import { PrismaClient, Users } from "@prisma/client";

export function createAuthRepositories(prisma: PrismaClient): AuthRepositories {
  const users = prisma.users;
  const sessions = prisma.sessions;

  return {
    createUser,
    findUser,
    findUserByEmail,
    createSession,
    deleteUser,
    updateUser,
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

  async function deleteUser(id: number) {}

  async function updateUser(id: number) {}
}
