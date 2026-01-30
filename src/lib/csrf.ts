import crypto from "crypto";

export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function validateCSRF(cookieToken?: string, headerToken?: string) {
  return cookieToken && headerToken && cookieToken === headerToken;
}
