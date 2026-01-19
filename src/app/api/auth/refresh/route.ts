import { prisma } from "@/src/lib/prisma";
import { generateRefreshToken, signAccessToken } from "@/src/services/token.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const oldToken = req.cookies.get("refreshToken")?.value;

  if (!oldToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const stored = await prisma.refreshToken.findUnique({
    where: { token: oldToken },
    include: { user: true },
  });

  if (!stored || stored.expiresAt < new Date()) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  await prisma.refreshToken.delete({
    where: { token: oldToken },
  });

  const newRefreshToken = generateRefreshToken();

  await prisma.refreshToken.create({
    data: {
      token: newRefreshToken,
      userId: stored.userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  const newAccessToken = signAccessToken(stored.user);

  const res = NextResponse.json({ message: "Token refreshed" });

  res.cookies.set("accessToken", newAccessToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 15,
  });

  res.cookies.set("refreshToken", newRefreshToken, {
    httpOnly: true,
    path: "/api/auth/refresh",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
