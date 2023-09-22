import { appErrors } from "@/errors";
import { FilesController, FilesServices } from "@/protocols";
import { Request, Response } from "express";
import httpStatus from "http-status";

export function createFilesController(
  filesServices: FilesServices
): FilesController {
  return {
    create,
    read,
    deleteFile,
  };

  async function create(req: Request, res: Response) {
    const { file } = req.body;
    const userId = res.locals.userId;

    filesServices.userId = userId;
    await filesServices.create(file);

    res.sendStatus(httpStatus.CREATED);
  }

  async function read(req: Request, res: Response) {
    const fileId = req.params.id;
    const userId = res.locals.userId;

    filesServices.userId = userId;
    const files = await filesServices.read(Number(fileId));

    res.send(files);
  }

  async function deleteFile(req: Request, res: Response) {
    const fileId = req.params.id;
    if (!fileId) throw appErrors.badRequest("No file provided");

    const userId = res.locals.userId;

    filesServices.userId = userId;
    await filesServices.deleteFile(Number(fileId));

    res.send(httpStatus.NO_CONTENT);
  }
}
