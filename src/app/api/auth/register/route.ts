import { rateLimit } from "@/src/lib/rateLimiter";
import { registerUser } from "@/src/services/auth.service";
import { registerSchema } from "@/src/validators/auth.schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forward-for") || "unknown";
  const limitError = rateLimit(`register:${ip}`);

  if (limitError) {
    return NextResponse.json({ message: limitError }, { status: 429 });
  }
  try {
    const body = await request.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { name, email, password } = result.data;

    const user = await registerUser(name, email, password);

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.message === "USER_EXISTS") {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    console.error("REGISTER_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
