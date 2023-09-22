import { PrismaClient } from "@prisma/client";

import { createAuthRouter } from "./auth-router";
import { createJWTvalidator } from "@/utils/validateJWT";

import { AuthMiddleware, verifyToken } from "@/middlewares/verify-jwt";
import { createFilesRouter } from "./files-router";

let authMiddleware: AuthMiddleware;
export function createRouter(prisma: PrismaClient) {
  //JWT middleware authenticator
  authMiddleware = verifyToken(createJWTvalidator(prisma.sessions));

  //Routes
  createAuthRouter(prisma);
  createFilesRouter(prisma);
}

export { authMiddleware };
export * from "./auth-router";
export * from "./files-router";
