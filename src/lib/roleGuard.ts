import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function requireRole(roles: Array<"USER" | "ADMIN">) {
  return (req: NextRequest) => {
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        role: "USER" | "ADMIN";
      };

      if (!roles.includes(decoded.role)) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }

      (req as any).user = decoded;
      return null;
    } catch {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
  };
}
