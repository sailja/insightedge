export const PERMISSIONS = {
  READ_DASHBOARD: "READ_DASHBOARD",
  MANAGE_USERS: "MANAGE_USERS",
  VIEW_REPORTS: "VIEW_REPORTS",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
