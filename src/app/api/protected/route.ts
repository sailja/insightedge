import { authenticate } from "@/src/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = authenticate(req as any);
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }
}
