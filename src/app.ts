import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";

import { prisma } from "@/config";

import { handleAppErrors } from "@/middlewares";
import { authRouter, createRouter } from "@/routers";
import { connectDb, disconnectDB } from "@/config";

const app = express();

export async function init(): Promise<Express> {
  await connectDb();
  createRouter(prisma);
  app
    .use(cors())
    .use(express.json())
    .get("/health", (_req, res) => res.send("OK!"))
    .use("/auth", authRouter)
    .use(handleAppErrors);
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
