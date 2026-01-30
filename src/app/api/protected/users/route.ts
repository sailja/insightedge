import { authenticate } from "@/src/lib/auth";
import { requirePermission } from "@/src/lib/permissionGuard";
import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await authenticate(req);

    requirePermission(user, "VIEW_USERS");

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json({ users });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === "Forbidden") {
      return NextResponse.json({ message: "forbidden" }, { status: 403 });
    }

    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }
}
