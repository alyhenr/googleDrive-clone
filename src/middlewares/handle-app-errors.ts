import { NextFunction, Request, Response } from "express";

import { AppError } from "@/protocols";
import { ApplicationErrors } from "@/errors";
import httpStatus from "http-status";

export function handleAppErrors(
  err: AppError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ApplicationErrors) {
    return res.status(err.status).send(err.message);
  }

  return res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .send("Something went wrong... Try again in a few minutes");
}
