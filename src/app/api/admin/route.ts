import { requireAuth } from "@/src/lib/authGuard";
import { requireRole } from "@/src/lib/roleGuard";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const auth = requireAuth(req);
    if (auth.error) return auth.error;
    const roleError = requireRole(["ADMIN"])(req);

    if (roleError) {
      return roleError;
    }

    return NextResponse.json({
      message: "Welcome admin",
      user: auth.user,
    });
  } catch (error: any) {
    if (error.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
