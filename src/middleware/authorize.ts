import "dotenv/config";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { Context } from "hono";

export async function authorize(c: Context, next: any, userRole: string) {
  const token: string = c.req.header("Authorization");
  if (!token) {
    return c.json({ message: "You're unauthorized" }, 401);
  }
  try {
    const { role } = (await jwt.verify(
      token,
      process.env.SECRET as string
    )) as JwtPayload;

    if (userRole === "both") {
      await next();
    }
    if (role === userRole) {
      await next();
    }

    return c.json({ message: "The user is unauthorized" }, 401);
  } catch (error) {
    return c.json({ message: "Invalid token" }, 403);
  }
}

export async function adminAuth(c: Context, next:any) {
  return authorize(c, next, "admin");
}

export async function userAuth(c: Context, next:any) {
  return authorize(c, next, "user");
}
export async function authorizeAll(c: Context, next:any) {
  return authorize(c, next, "both");
}
