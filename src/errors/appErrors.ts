import httpStatus from "http-status";

export class ApplicationErrors {
  status: number;
  message: string;
  constructor() {}

  setMessage(message: string) {
    this.message = message;
    return this;
  }

  setStatus(status: number) {
    this.status = status;

    return this.setMessage.bind(this);
  }
}

const appError = new ApplicationErrors();

export const appErrors = {
  conflict: (message: string) =>
    appError.setStatus(httpStatus.CONFLICT)(message),
  invalidData: (message: string) =>
    appError.setStatus(httpStatus.UNPROCESSABLE_ENTITY)(message),
  badRequest: (message: string) =>
    appError.setStatus(httpStatus.BAD_REQUEST)(message),
  unauthorized: (message: string) =>
    appError.setStatus(httpStatus.UNAUTHORIZED)(message),
  forbidden: (message: string) =>
    appError.setStatus(httpStatus.FORBIDDEN)(message),
  notFound: (message: string) =>
    appError.setStatus(httpStatus.NOT_FOUND)(message),
};
