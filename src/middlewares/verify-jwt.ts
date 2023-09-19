import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import { appErrors } from "@/errors";

export function verifyToken(
  findSession: (token: string) => Promise<boolean>
): AuthMiddleware {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      throw appErrors.unauthorized("No token provided!");
    }

    const token = authHeader.split(" ")[1];
    if (!(await findSession(token))) {
      appErrors.unauthorized("Invalid token!");
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    res.locals.userId = userId;
    next();
  };
}

export type AuthenticatedRequest = Request & JWTPayload;
type JWTPayload = {
  userId: number;
};

export type AuthMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => Promise<void>;
