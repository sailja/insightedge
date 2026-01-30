import { prisma } from "@/src/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const refreshToken = (await cookies()).get("refreshToken")?.value;
  const res = NextResponse.json({ message: "Logged out" });
  if (refreshToken) {
    await prisma.refreshToken.deleteMany({
      where: { token: refreshToken },
    });
  }

  (await cookies()).set({
    name: "accessToken",
    value: "",
    path: "/",
  });
  (await cookies()).set({
    name: "refreshToken",
    value: "",
    path: "/api/auth/refresh",
  });
  return res;
}
