import "dotenv/config";
import jwt from "jsonwebtoken";
export async function authorize(c, next, userRole) {
    const token = c.req.header("Authorization");
    if (!token) {
        return c.json({ message: "You're unauthorized" }, 401);
    }
    try {
        const { role } = jwt.verify(token, process.env.SECRET);
        if (userRole === "both") {
            await next();
        }
        if (role === userRole) {
            await next();
        }
        return c.json({ message: "The user is unauthorized" }, 401);
    }
    catch (error) {
        return c.json({ message: "Invalid token" }, 403);
    }
}
export async function adminAuth(c, next) {
    return authorize(c, next, "admin");
}
export async function userAuth(c, next) {
    return authorize(c, next, "user");
}
export async function authorizeAll(c, next) {
    return authorize(c, next, "both");
}
