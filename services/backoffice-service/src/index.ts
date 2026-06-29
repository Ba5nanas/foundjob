import { existsSync, mkdirSync, unlinkSync } from "node:fs";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { dirname } from "node:path";
import {
  createBackofficeResource,
  createBackofficeRole,
  deleteBackofficeResource,
  deleteBackofficeRole,
  getBackofficeResource,
  getBackofficeRole,
  getBackofficeRolePermissions,
  getCurrentBackofficeAdmin,
  isBackofficeResourceKind,
  listBackofficeAuditLogs,
  listBackofficeDashboard,
  listBackofficePermissions,
  listBackofficeResource,
  listBackofficeRoles,
  updateBackofficeResource,
  updateBackofficeRole,
  updateBackofficeRolePermissions,
  updateCurrentBackofficeAdmin,
  updateCurrentBackofficeAdminAvatar,
  updateCurrentBackofficeAdminPassword
} from "./admin-resources/admin-resources";
import {
  activateAdminUser,
  assignAdminRole,
  createAdminUser,
  deleteAdminUser,
  getAdminUser,
  listAdminUsers,
  resetAdminPassword,
  suspendAdminUser,
  updateAdminUser
} from "./admin-users/admin-users";
import {
  cancelAdminAppointment,
  getAdminAppointment,
  listAdminAppointments,
  updateAdminAppointment
} from "./appointments/admin-appointments";

export * from "./admin-resources/admin-resources";
export * from "./admin-users/admin-users";
export * from "./appointments/admin-appointments";
export * from "./permissions/default-permissions";
export * from "./roles/default-roles";
export * from "./roles/role-level-policy";
export * from "./security/password";
export * from "./seeding/backoffice-seed";

export const backofficeServiceManifest = {
  name: "backoffice-service",
  domain: "backoffice",
  socketEnv: "BACKOFFICE_SERVICE_SOCKET",
  owns: [
    "dashboard",
    "public users",
    "companies",
    "jobs",
    "applications",
    "appointments",
    "packages",
    "files",
    "settings",
    "admin users",
    "roles",
    "permissions",
    "audit logs",
    "admin policy"
  ]
} as const;

export function getBackofficeServiceSocketPath() {
  return process.env[backofficeServiceManifest.socketEnv] ?? "/var/run/foundjob/backoffice-service.sock";
}

export async function startBackofficeService() {
  const socketPath = getBackofficeServiceSocketPath();

  mkdirSync(dirname(socketPath), { recursive: true });

  if (existsSync(socketPath)) {
    unlinkSync(socketPath);
  }

  const server = createServer((request, response) => {
    void handleBackofficeServiceRequest(request, response);
  });

  await new Promise<void>((resolve) => {
    server.listen(socketPath, () => resolve());
  });

  return server;
}

if (require.main === module) {
  void startBackofficeService();
}

async function handleBackofficeServiceRequest(request: IncomingMessage, response: ServerResponse) {
  const method = request.method ?? "GET";
  const path = request.url?.split("?")[0] ?? "/";

  if (method === "GET" && path === "/health") {
    writeJson(response, 200, {
      service: backofficeServiceManifest.name,
      domain: backofficeServiceManifest.domain,
      status: "ok"
    });
    return;
  }

  if (method === "GET" && path === "/admin/dashboard") {
    writeJson(response, 200, { ok: true, data: listBackofficeDashboard() });
    return;
  }

  if (path === "/admin/me") {
    if (method === "GET") {
      writeJson(response, 200, { ok: true, data: getCurrentBackofficeAdmin() });
      return;
    }

    if (method === "PUT") {
      writeJson(response, 200, { ok: true, data: updateCurrentBackofficeAdmin(await readJsonObject(request)) });
      return;
    }
  }

  if (method === "PUT" && path === "/admin/me/password") {
    writeJson(response, 200, { ok: true, data: updateCurrentBackofficeAdminPassword(await readJsonObject(request)) });
    return;
  }

  if (method === "POST" && path === "/admin/me/avatar") {
    writeJson(response, 200, { ok: true, data: updateCurrentBackofficeAdminAvatar(await readJsonObject(request)) });
    return;
  }

  if (method === "GET" && path === "/admin/permissions") {
    writeJson(response, 200, { ok: true, data: listBackofficePermissions() });
    return;
  }

  if (method === "GET" && path === "/admin/audit-logs") {
    writeJson(response, 200, { ok: true, data: listBackofficeAuditLogs() });
    return;
  }

  if (path === "/admin/roles") {
    if (method === "GET") {
      writeJson(response, 200, { ok: true, data: listBackofficeRoles() });
      return;
    }

    if (method === "POST") {
      writeJson(response, 201, { ok: true, data: createBackofficeRole(await readJsonObject(request)) });
      return;
    }
  }

  const rolePermissionsMatch = path.match(/^\/admin\/roles\/([^/]+)\/permissions$/);

  if (rolePermissionsMatch) {
    const roleId = decodeURIComponent(rolePermissionsMatch[1] ?? "");

    if (method === "GET") {
      writeEntity(response, "ROLE_NOT_FOUND", `Role not found: ${roleId}`, getBackofficeRolePermissions(roleId));
      return;
    }

    if (method === "PUT") {
      writeEntity(
        response,
        "ROLE_NOT_FOUND",
        `Role not found: ${roleId}`,
        updateBackofficeRolePermissions(roleId, await readJsonObject(request))
      );
      return;
    }
  }

  const roleMatch = path.match(/^\/admin\/roles\/([^/]+)$/);

  if (roleMatch) {
    const roleId = decodeURIComponent(roleMatch[1] ?? "");

    if (method === "GET") {
      writeEntity(response, "ROLE_NOT_FOUND", `Role not found: ${roleId}`, getBackofficeRole(roleId));
      return;
    }

    if (method === "PATCH") {
      writeEntity(
        response,
        "ROLE_NOT_FOUND",
        `Role not found: ${roleId}`,
        updateBackofficeRole(roleId, await readJsonObject(request))
      );
      return;
    }

    if (method === "DELETE") {
      writeEntity(response, "ROLE_NOT_FOUND", `Role not found: ${roleId}`, deleteBackofficeRole(roleId));
      return;
    }
  }

  if (method === "GET" && path === "/admin/appointments") {
    writeJson(response, 200, { ok: true, data: listAdminAppointments() });
    return;
  }

  if (path === "/admin/admin-users") {
    if (method === "GET") {
      writeJson(response, 200, { ok: true, data: listAdminUsers() });
      return;
    }

    if (method === "POST") {
      writeJson(response, 201, { ok: true, data: createAdminUser(await readJsonObject(request)) });
      return;
    }
  }

  const adminUserActionMatch = path.match(
    /^\/admin\/admin-users\/([^/]+)\/(suspend|activate|reset-password|role)$/
  );

  if (adminUserActionMatch) {
    const adminUserId = decodeURIComponent(adminUserActionMatch[1] ?? "");
    const action = adminUserActionMatch[2];

    if (method === "POST" && action === "suspend") {
      writeEntity(response, "ADMIN_USER_NOT_FOUND", `Admin user not found: ${adminUserId}`, suspendAdminUser(adminUserId));
      return;
    }

    if (method === "POST" && action === "activate") {
      writeEntity(response, "ADMIN_USER_NOT_FOUND", `Admin user not found: ${adminUserId}`, activateAdminUser(adminUserId));
      return;
    }

    if (method === "POST" && action === "reset-password") {
      writeEntity(
        response,
        "ADMIN_USER_NOT_FOUND",
        `Admin user not found: ${adminUserId}`,
        resetAdminPassword(adminUserId, await readJsonObject(request))
      );
      return;
    }

    if (method === "PUT" && action === "role") {
      writeEntity(
        response,
        "ADMIN_USER_ROLE_NOT_ASSIGNED",
        `Admin user or role not found: ${adminUserId}`,
        assignAdminRole(adminUserId, await readJsonObject(request))
      );
      return;
    }
  }

  const adminUserMatch = path.match(/^\/admin\/admin-users\/([^/]+)$/);

  if (adminUserMatch) {
    const adminUserId = decodeURIComponent(adminUserMatch[1] ?? "");

    if (method === "GET") {
      writeEntity(response, "ADMIN_USER_NOT_FOUND", `Admin user not found: ${adminUserId}`, getAdminUser(adminUserId));
      return;
    }

    if (method === "PATCH") {
      writeEntity(
        response,
        "ADMIN_USER_NOT_FOUND",
        `Admin user not found: ${adminUserId}`,
        updateAdminUser(adminUserId, await readJsonObject(request))
      );
      return;
    }

    if (method === "DELETE") {
      writeEntity(response, "ADMIN_USER_NOT_FOUND", `Admin user not found: ${adminUserId}`, deleteAdminUser(adminUserId));
      return;
    }
  }

  const resourceCollectionMatch = path.match(/^\/admin\/(users|companies|jobs|applications|packages|files|settings)$/);

  if (resourceCollectionMatch) {
    const resource = resourceCollectionMatch[1] ?? "";

    if (isBackofficeResourceKind(resource)) {
      if (method === "GET") {
        writeJson(response, 200, { ok: true, data: listBackofficeResource(resource) });
        return;
      }

      if (method === "POST") {
        writeEntity(
          response,
          "BACKOFFICE_RESOURCE_NOT_CREATABLE",
          `Resource cannot be created through this route: ${resource}`,
          createBackofficeResource(resource, await readJsonObject(request)),
          201
        );
        return;
      }
    }
  }

  const resourceDetailMatch = path.match(/^\/admin\/(users|companies|jobs|applications|packages|files|settings)\/([^/]+)$/);

  if (resourceDetailMatch) {
    const resource = resourceDetailMatch[1] ?? "";
    const resourceId = decodeURIComponent(resourceDetailMatch[2] ?? "");

    if (isBackofficeResourceKind(resource)) {
      if (method === "GET") {
        writeEntity(
          response,
          "BACKOFFICE_RESOURCE_NOT_FOUND",
          `Resource not found: ${resource}/${resourceId}`,
          getBackofficeResource(resource, resourceId)
        );
        return;
      }

      if (method === "PATCH") {
        writeEntity(
          response,
          "BACKOFFICE_RESOURCE_NOT_FOUND",
          `Resource not found: ${resource}/${resourceId}`,
          updateBackofficeResource(resource, resourceId, await readJsonObject(request))
        );
        return;
      }

      if (method === "DELETE") {
        writeEntity(
          response,
          "BACKOFFICE_RESOURCE_NOT_FOUND",
          `Resource not found: ${resource}/${resourceId}`,
          deleteBackofficeResource(resource, resourceId)
        );
        return;
      }
    }
  }

  const appointmentMatch = path.match(/^\/admin\/appointments\/([^/]+)$/);

  if (appointmentMatch) {
    const appointmentId = decodeURIComponent(appointmentMatch[1] ?? "");

    if (method === "GET") {
      const appointment = getAdminAppointment(appointmentId);
      writeJson(
        response,
        appointment ? 200 : 404,
        appointment
          ? { ok: true, data: appointment }
          : { ok: false, error: { code: "APPOINTMENT_NOT_FOUND", message: `Appointment not found: ${appointmentId}` } }
      );
      return;
    }

    if (method === "PATCH") {
      const appointment = updateAdminAppointment(appointmentId, await readJsonObject(request));
      writeJson(
        response,
        appointment ? 200 : 404,
        appointment
          ? { ok: true, data: appointment }
          : { ok: false, error: { code: "APPOINTMENT_NOT_FOUND", message: `Appointment not found: ${appointmentId}` } }
      );
      return;
    }

    if (method === "DELETE") {
      const appointment = cancelAdminAppointment(appointmentId, await readJsonObject(request));
      writeJson(
        response,
        appointment ? 200 : 404,
        appointment
          ? { ok: true, data: appointment }
          : { ok: false, error: { code: "APPOINTMENT_NOT_FOUND", message: `Appointment not found: ${appointmentId}` } }
      );
      return;
    }
  }

  writeJson(response, 404, { ok: false, error: { code: "BACKOFFICE_ROUTE_NOT_FOUND", message: `${method} ${path}` } });
}

function writeEntity(
  response: ServerResponse,
  errorCode: string,
  errorMessage: string,
  entity: unknown,
  successStatus = 200
) {
  writeJson(
    response,
    entity ? successStatus : 404,
    entity ? { ok: true, data: entity } : { ok: false, error: { code: errorCode, message: errorMessage } }
  );
}

function writeJson(response: ServerResponse, statusCode: number, payload: unknown) {
  response.writeHead(statusCode, { "content-type": "application/json" });
  response.end(JSON.stringify(payload));
}

function readJsonObject(request: IncomingMessage) {
  return new Promise<Record<string, unknown>>((resolve) => {
    const chunks: Buffer[] = [];

    request.on("data", (chunk: Buffer | string) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });

    request.on("end", () => {
      const text = Buffer.concat(chunks).toString("utf8");

      if (!text) {
        resolve({});
        return;
      }

      try {
        const parsed = JSON.parse(text) as unknown;
        resolve(isRecord(parsed) ? parsed : {});
      } catch {
        resolve({});
      }
    });
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
