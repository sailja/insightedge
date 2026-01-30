export function hasPermission(permissions: string[], required: string) {
  return permissions.includes(required);
}

export function requirePermission(user: { permissions: { name: string }[] }, permission: string) {
  const hasPermission = user.permissions.some((p) => p.name === permission);
  if (!hasPermission) {
    throw new Error("Forbidden");
  }
}
