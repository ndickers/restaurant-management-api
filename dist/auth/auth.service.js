import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { auth } from '../drizzle/schema';
export async function confirmUserName(uName) {
    const checkUsername = await db.query.auth.findMany({
        where: eq(auth.username, uName.username),
    });
    return checkUsername;
}
export async function registerNewUser(user) {
    await db.insert(auth).values(user);
}
export async function userLogin(user) {
    const getUser = await db.query.auth.findMany({
        with: { user: true },
        where: eq(auth.username, user.username),
    });
    return getUser;
}
