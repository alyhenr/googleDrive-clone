import { Router } from "express";

import { createFilesController } from "@/controllers/files-controller";
import { createFilesServices } from "@/services/files-service";
import { createFilesRepositories } from "@/repositories";

import { PrismaClient } from "@prisma/client";
import { authMiddleware } from ".";

const filesRouter = Router();
export function createFilesRouter(prisma: PrismaClient) {
  const filesRepositories = createFilesRepositories(prisma);
  const filesServices = createFilesServices(filesRepositories);
  const filesController = createFilesController(filesServices);

  filesRouter.post("/", authMiddleware, filesController.create);
  filesRouter.get("/:id", authMiddleware, filesController.read);
  filesRouter.delete("/:id", authMiddleware, filesController.deleteFile);
}

export { filesRouter };
