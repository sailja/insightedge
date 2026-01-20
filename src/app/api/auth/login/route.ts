import { signToken } from "@/src/lib/jwt";
import { rateLimit } from "@/src/lib/rateLimiter";
import { loginUser } from "@/src/services/auth.service";
import { generateRefreshToken } from "@/src/services/token.service";
import { loginSchema } from "@/src/validators/auth.schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forward-for") || "unknown";
  const limitError = rateLimit(`login:${ip}`);

  if (limitError) {
    return NextResponse.json({ message: limitError }, { status: 429 });
  }
  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid Input" }, { status: 400 });
    }
    const { email, password } = result.data;

    const user = await loginUser(email, password);
    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken();

    const response = NextResponse.json({
      success: true,
      message: "Login Successful",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15, //1 day
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/auth/refresh",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
  }
}
