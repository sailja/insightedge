import { authenticate } from "@/src/lib/auth";
import { requireAdmin } from "@/src/lib/roleGuard";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = authenticate(req);
    requireAdmin(user);

    return NextResponse.json({
      message: "Welcome admin",
      user,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
