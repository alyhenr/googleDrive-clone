import { FilesRepositories } from "@/protocols";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export function createFilesRepositories(
  prisma: PrismaClient
): FilesRepositories {
  return {
    create,
    read,
    deleteFile,
  };

  async function create(file: File) {}

  async function read(id: number | null): Promise<File | File[]> {
    return;
  }

  async function deleteFile(id: number) {}
}
