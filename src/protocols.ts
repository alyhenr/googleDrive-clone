import { Request, Response } from "express";
import { SignIn, SignUp } from "./schemas";
import { PrismaClient, Sessions, Users } from "@prisma/client";

export type AppError = {
  status: number;
  message: string;
};

//Auth
export type AuthController = {
  signUp: (req: Request, res: Response) => Promise<void>;
  signIn: (req: Request, res: Response) => Promise<void>;
  logout: (req: Request, res: Response) => Promise<void>;
  deleteUser: (req: Request, res: Response) => Promise<void>;
  update: (req: Request, res: Response) => Promise<void>;
};
export type AuthServices = {
  signUp: (user: SignUp) => Promise<void>;
  signIn: (user: SignIn) => Promise<{
    userId: number;
    token: string;
  }>;
  logout: (token: string) => Promise<void>;
  deleteUser: (id: number, token: string) => Promise<void>;
  update: (id: number, data: Partial<Users>) => Promise<void>;
};
export type AuthRepositories = {
  createUser: (user: SignUp) => Promise<void>;
  findUser: (user: SignIn) => Promise<Users>;
  findUserById: (id: number) => Promise<Users>;
  findUserByEmail: (email: string) => Promise<boolean>;
  createSession: (userId: number, token: string) => Promise<void>;
  findSession: (token: string) => Promise<Sessions>;
  endSession: (token: string) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  updateUser: (id: number) => Promise<void>;
};

//Files
export type FilesController = {
  create: (req: Request, res: Response) => Promise<void>;
  read: (req: Request, res: Response) => Promise<void>;
  deleteFile: (req: Request, res: Response) => Promise<void>;
};
export interface FilesServices {
  userId: number;
  create: (file: File) => Promise<void>;
  read: (id: number | null) => Promise<File | File[]>;
  deleteFile: (id: number) => Promise<void>;
}

export type FilesRepositories = {
  create: (file: File) => Promise<void>;
  read: (id: number | null) => Promise<File | File[]>;
  deleteFile: (id: number) => Promise<void>;
};
