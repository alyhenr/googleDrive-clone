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
  conflict: appError.setStatus(httpStatus.CONFLICT),
  invalidData: appError.setStatus(httpStatus.UNPROCESSABLE_ENTITY),
  badRequest: appError.setStatus(httpStatus.BAD_REQUEST),
  unauthorized: appError.setStatus(httpStatus.UNAUTHORIZED),
  forbidden: appError.setStatus(httpStatus.FORBIDDEN),
  notFound: appError.setStatus(httpStatus.NOT_FOUND),
};
