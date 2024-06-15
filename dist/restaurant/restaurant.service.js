import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { restaurant } from '../drizzle/schema';
export async function serveAllRest() {
    return await db.query.restaurant.findMany({
        with: {
            restaurant_owner: true,
            orders: true,
        },
    });
}
export async function fetchOneRest(id) {
    return await db.query.restaurant.findMany({
        where: eq(restaurant.id, id),
        with: {
            restaurant_owner: true,
            orders: true,
        },
    });
}
export async function addRest(restDetail) {
    return await db.insert(restaurant).values(restDetail);
}
export async function serveUpdate(id, restUpdates) {
    return await db
        .update(restaurant)
        .set(restUpdates)
        .where(eq(restaurant.id, id));
}
export async function deleteRest(id) {
    return await db.delete(restaurant).where(eq(restaurant.id, id));
}
