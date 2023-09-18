import * as jwt from "jsonwebtoken";

import { appErrors } from "@/errors";
import { AuthRepositories, AuthServices } from "@/protocols";
import { SignIn, SignUp } from "@/schemas";

export function createAuthServices(
  authRepositories: AuthRepositories
): AuthServices {
  return {
    signUp,
    signIn,
  };

  async function signUp(user: SignUp) {
    if (await authRepositories.findUserByEmail(user.email)) {
      throw appErrors.conflict("Email already in use");
    }

    authRepositories.createUser(user);
  }

  async function signIn({ email, password }: SignIn): Promise<string> {
    const user = await authRepositories.findUser({
      email: email,
      password: password,
    });

    if (!user) {
      throw appErrors.badRequest("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    authRepositories.createSession(user.id, token);

    return token;
  }
}
