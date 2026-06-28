import { Injectable } from "@nestjs/common";
import { FileVisibility } from "@foundjob/shared-types";
import type { FileDocument } from "./file-document";

@Injectable()
export class FileService {
  resolvePublicUrl(file: Pick<FileDocument, "visibility" | "publicPath" | "localPath">): string {
    if (file.visibility !== FileVisibility.PUBLIC || !file.publicPath) {
      throw new Error("Only public files can be resolved to public URLs");
    }

    return file.publicPath.startsWith("/public/") ? file.publicPath : `/public/${file.publicPath.replace(/^\/+/, "")}`;
  }

  toProtectedDescriptor(file: Pick<FileDocument, "id" | "visibility" | "localPath">) {
    if (file.visibility === FileVisibility.PUBLIC) {
      return { type: "public" as const, fileId: file.id };
    }

    return {
      type: "protected" as const,
      fileId: file.id,
      requiresDomainPermission: true
    };
  }
}
