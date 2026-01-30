import { generateCsrfToken } from "@/src/lib/csrf";
import { NextResponse } from "next/server";

export async function GET() {
  const token = generateCsrfToken();

  const res = NextResponse.json({ csrfToken: token });

  res.cookies.set("csrfToken", token, {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return res;
}
