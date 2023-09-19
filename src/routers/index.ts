import { PrismaClient } from "@prisma/client";

import { createAuthRouter } from "./auth-router";
import { createJWTvalidator } from "@/utils/validateJWT";

import { AuthMiddleware, verifyToken } from "@/middlewares/verify-jwt";

let authMiddleware: AuthMiddleware;
export function createRouter(prisma: PrismaClient) {
  //JWT middleware authenticator
  authMiddleware = verifyToken(createJWTvalidator(prisma.sessions));

  //Routes
  createAuthRouter(prisma);
}

export { authMiddleware };
export * from "./auth-router";
