import { Users } from "@prisma/client";
import Joi from "joi";

export const signUpSchema = Joi.object<SignUp>({
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  email: Joi.string().min(5).max(100).required(),
  password: Joi.string().min(5).max(100).required(),
});

export type SignUp = Pick<
  Users,
  "firstName" | "lastName" | "email" | "password"
>;

export const signInSchema = Joi.object<SignIn>({
  email: Joi.string().min(5).max(100).required(),
  password: Joi.string().min(5).max(100).required(),
});

export type SignIn = Pick<SignUp, "email" | "password">;
