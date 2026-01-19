import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./auth";

export function requireAuth(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return {
      error: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return { error: NextResponse.json({ message: "Invalid token" }, { status: 401 }) };
  }

  return { user: decoded };
}
