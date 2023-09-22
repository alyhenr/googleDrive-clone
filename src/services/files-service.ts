import { FilesRepositories, FilesServices } from "@/protocols";

export function createFilesServices(
  filesRepositories: FilesRepositories
): FilesServices {
  class FileService implements FilesServices {
    userId: number;
    constructor() {}

    async create() {}

    async read(): Promise<File | File[]> {
      return;
    }

    async deleteFile() {}
  }

  return new FileService();
}
