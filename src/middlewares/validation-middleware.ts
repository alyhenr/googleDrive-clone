import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

import { appErrors } from "@/errors";

export function validate(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (!error) {
      next();
    } else {
      let errorMessage = "";
      error.details.forEach((d) => (errorMessage += d.message + " "));

      throw appErrors.invalidData(errorMessage);
    }
  };
}
