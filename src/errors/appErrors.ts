import httpStatus from "http-status";

import { AppError } from "@/protocols";

export class ApplicationErrors {
  constructor(
    public status: number = status,
    public message: string = message
  ) {}
}

const createObject = (message: string, status: number): ApplicationErrors =>
  new ApplicationErrors(status, message);

export const appErrors = {
  invalidData: (message: string) =>
    createObject(message, httpStatus.UNPROCESSABLE_ENTITY),
  conflict: (message: string) => createObject(message, httpStatus.CONFLICT),
  badRequest: (message: string) =>
    createObject(message, httpStatus.BAD_REQUEST),
  unauthorized: (message: string) =>
    createObject(message, httpStatus.UNAUTHORIZED),
};
