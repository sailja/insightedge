import { authenticate } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { requireAdmin } from "@/src/lib/roleGuard";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, permissions } = await req.json();

  try {
    const admin = authenticate(req);
    requireAdmin(admin);

    await prisma.user.update({
      where: { id: userId },
      data: { permissions: { connect: { name: permissions } } },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}
