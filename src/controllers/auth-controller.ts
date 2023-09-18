import { Request, Response } from "express";

import { AuthServices } from "@/protocols";
import { SignIn, SignUp } from "@/schemas";
import httpStatus from "http-status";
import { AuthController } from "@/protocols";

export function createAuthControllers(
  authServices: AuthServices
): AuthController {
  return {
    signUp,
    signIn,
  };
  async function signUp(req: Request, res: Response) {
    const { firstName, lastName, email, password }: SignUp = req.body;
    await authServices.signUp({ firstName, lastName, email, password });

    res.sendStatus(httpStatus.CREATED);
  }

  async function signIn(req: Request, res: Response) {
    const { email, password }: SignIn = req.body;
    const token = await authServices.signIn({ email, password });

    res.status(httpStatus.OK).send({
      token,
    });
  }
}
