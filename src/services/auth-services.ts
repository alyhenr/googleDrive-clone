import * as jwt from "jsonwebtoken";

import { appErrors } from "@/errors";

import { AuthRepositories, AuthServices } from "@/protocols";
import { SignIn, SignUp } from "@/schemas";

import { Sessions, Users } from "@prisma/client";

export function createAuthServices(
  authRepositories: AuthRepositories
): AuthServices {
  return {
    signUp,
    signIn,
    logout,
    deleteUser,
    update,
  };

  async function signUp(user: SignUp) {
    if (await authRepositories.findUserByEmail(user.email)) {
      throw appErrors.conflict("Email already in use");
    }

    authRepositories.createUser(user);
  }

  async function signIn({ email, password }: SignIn): Promise<{
    userId: number;
    token: string;
  }> {
    const user: Users = await authRepositories.findUser({
      email: email,
      password: password,
    });

    if (!user) {
      throw appErrors.badRequest("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    authRepositories.createSession(user.id, token);

    return { userId: user.id, token };
  }

  async function logout(token: string) {
    await authRepositories.endSession(token);
  }

  async function deleteUser(id: number, token: string) {
    const user: Users = await authRepositories.findUserById(id);
    const session: Sessions = await authRepositories.findSession(token);

    if (!user) {
      throw appErrors.badRequest("User not found");
    }

    if (!session) {
      throw appErrors.forbidden("Invalid session");
    }

    if (user.id !== session.userId) {
      throw appErrors.forbidden("This token belongs to another user");
    }

    authRepositories.deleteUser(id);
  }

  async function update(id: number) {}
}
