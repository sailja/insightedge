import jwt from "jsonwebtoken";
import crypto from "crypto";

interface User {
  id: string;
  role: string;
  email: string;
}

export function signAccessToken(user: User) {
  return jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });
}

export function generateRefreshToken() {
  return crypto.randomBytes(40).toString("hex");
}
