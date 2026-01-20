import { AuthPayload } from "./auth";

export function requireAdmin(user: AuthPayload) {
  if (user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }
}

export function requireRole(user: AuthPayload, roles: AuthPayload["role"][]) {
  if (!roles.includes(user.role)) {
    throw new Error("Forbidden");
  }
}
