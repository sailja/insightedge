import { AuthPayload } from "./auth";
import { requirePermission } from "./permissionGuard";

export function requireAdmin(user: AuthPayload) {
  if (user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }
  requirePermission(user, "MANAGE_USERS");
}

export function requireRole(user: AuthPayload, roles: AuthPayload["role"][]) {
  if (!roles.includes(user.role)) {
    throw new Error("Forbidden");
  }
}
