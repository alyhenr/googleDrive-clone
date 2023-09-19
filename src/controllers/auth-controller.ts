import { Request, Response } from "express";

import { AuthServices } from "@/protocols";
import { SignIn, SignUp } from "@/schemas";
import httpStatus from "http-status";
import { AuthController } from "@/protocols";
import { appErrors } from "@/errors";

export function createAuthControllers(
  authServices: AuthServices
): AuthController {
  return {
    signUp,
    signIn,
    logout,
    deleteUser,
    update,
  };
  async function signUp(req: Request, res: Response) {
    const { firstName, lastName, email, password }: SignUp = req.body;
    await authServices.signUp({ firstName, lastName, email, password });

    res.sendStatus(httpStatus.CREATED);
  }

  async function signIn(req: Request, res: Response) {
    const { email, password }: SignIn = req.body;
    const { userId, token } = await authServices.signIn({ email, password });

    res.status(httpStatus.OK).send({
      userId,
      token,
    });
  }

  async function logout(req: Request, res: Response) {
    const { token } = res.locals;

    await authServices.logout(token);
    res.sendStatus(httpStatus.NO_CONTENT);
  }

  async function deleteUser(req: Request, res: Response) {
    const { token } = res.locals;
    const { id } = req.params;

    if (!id) {
      throw appErrors;
    }

    await authServices.deleteUser(Number(id), token);
    res.sendStatus(httpStatus.NO_CONTENT);
  }

  async function update(req: Request, res: Response) {}
}
