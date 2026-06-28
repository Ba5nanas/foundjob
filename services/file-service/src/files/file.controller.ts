import { Controller, Get, Param } from "@nestjs/common";
import { FileVisibility } from "@foundjob/shared-types";
import { FileService } from "./file.service";

@Controller("files")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(":fileId/descriptor")
  descriptor(@Param("fileId") fileId: string) {
    return this.fileService.toProtectedDescriptor({
      id: fileId,
      visibility: FileVisibility.PRIVATE,
      localPath: "/data/files/private/not-returned"
    });
  }
}
