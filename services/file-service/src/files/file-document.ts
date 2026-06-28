import { FileVisibility } from "@foundjob/shared-types";

export interface FileDocument {
  id: string;
  originalName: string;
  storedName: string;
  extension: string;
  mimeType: string;
  size: number;
  checksum: string;
  storageDriver: "local" | "s3" | "r2" | "local_s3_sync";
  localPath: string;
  publicPath: string | null;
  bucket: string | null;
  objectKey: string | null;
  remoteUrl: string | null;
  visibility: FileVisibility;
  encryption: {
    enabled: boolean;
    algorithm: string | null;
    keyVersion: string | null;
    iv: string | null;
    authTag: string | null;
  };
  ownerType: string;
  ownerId: string;
  uploadedBy: string;
  status: "ACTIVE" | "QUARANTINED" | "DELETED";
  syncedToRemote: boolean;
  syncedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
