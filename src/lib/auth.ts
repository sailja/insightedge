import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export interface AuthPayload {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
}

export function authenticate(req: NextRequest): AuthPayload {
  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    throw new Error("Unauthenticated");
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
  } catch {
    throw new Error("Invalid token");
  }
}
