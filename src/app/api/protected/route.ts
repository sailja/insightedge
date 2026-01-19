import { requireAuth } from "@/src/lib/authGuard";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);

  if (auth.error) return auth.error;

  return NextResponse.json({
    message: "Protected data",
    user: auth.user,
  });
}
