import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET!;

export function signToken(payload: { id: string; email: string; role: string }) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as {
    id: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
  };
}
