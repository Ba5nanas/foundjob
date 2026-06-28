export const foundjobConfig = {
  domain: "foundjob.net",
  appName: "FoundJob",
  sockets: {
    mainControl: process.env.MAIN_CONTROL_SOCKET ?? "/var/run/foundjob/main-control.sock",
    fileService: process.env.FILE_SERVICE_SOCKET ?? "/var/run/foundjob/file-service.sock"
  },
  files: {
    storageRoot: process.env.FILE_STORAGE_ROOT ?? "/data/files",
    publicRoot: process.env.FILE_PUBLIC_ROOT ?? "/data/files/public"
  }
} as const;
