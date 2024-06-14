import db from "../drizzle/db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
export async function serveAllUsers() {
    return await db.query.users.findMany({
        with: {
            driver: true,
            restaurant_owner: true,
            orders: true,
            comment: true,
            address: true,
        },
    });
}
export async function serveOneUser(id) {
    return await db.query.users.findMany({
        where: eq(users.id, id),
        with: {
            driver: true,
            restaurant_owner: true,
            orders: true,
            comment: true,
            address: true,
        },
    });
}
export async function addToService(user) {
    return await db.insert(users).values(user);
}
export async function updateWhole(id, user) {
    return await db
        .update(users)
        .set(user)
        .where(eq(users.id, id))
        .returning(users);
}
export async function deleteService(id) {
    return await db.delete(users).where(eq(users.id, id));
}
