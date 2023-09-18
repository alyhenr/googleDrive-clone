import { Request, Response } from "express";
import { SignIn, SignUp } from "./schemas";
import { Users } from "@prisma/client";

export type AppError = {
  status: number;
  message: string;
};

//Auth
export type AuthController = {
  signUp: (req: Request, res: Response) => Promise<void>;
  signIn: (req: Request, res: Response) => Promise<void>;
};
export type AuthServices = {
  signUp: (user: SignUp) => Promise<void>;
  signIn: (user: SignIn) => Promise<string>;
};
export type AuthRepositories = {
  createUser: (user: SignUp) => Promise<void>;
  findUser: (user: SignIn) => Promise<Users>;
  findUserByEmail: (email: string) => Promise<boolean>;
  createSession: (userId: number, token: string) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  updateUser: (id: number) => Promise<void>;
};
