import { Router } from "express";

import { createAuthControllers } from "@/controllers";
import { createAuthServices } from "@/services";
import { createAuthRepositories } from "@/repositories";

import { validate } from "@/middlewares";
import { signUpSchema, signInSchema } from "@/schemas";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from ".";

const authRouter = Router();
export function createAuthRouter(prisma: PrismaClient) {
  const authRepositories = createAuthRepositories(prisma);
  const authServices = createAuthServices(authRepositories);
  const authController = createAuthControllers(authServices);

  authRouter.post("/sign-up", validate(signUpSchema), authController.signUp);
  authRouter.post("/sign-in", validate(signInSchema), authController.signIn);
  authRouter.post("/logout", authMiddleware, authController.logout);
  authRouter.delete("/delete/:id", authMiddleware, authController.deleteUser);
}

export { authRouter };
