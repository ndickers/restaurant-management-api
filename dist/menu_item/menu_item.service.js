import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { menu_item } from '../drizzle/schema';
export async function serveAllMenuItem() {
    return await db.query.menu_item.findMany();
}
export async function fetchOneMenuItem(id) {
    return await db.query.menu_item.findMany({
        where: eq(menu_item.id, id),
    });
}
export async function serveMenuItem(details) {
    return await db.insert(menu_item).values(details);
}
export async function serveMenuItemUpdate(id, updates) {
    return await db.update(menu_item).set(updates).where(eq(menu_item.id, id));
}
export async function deleteMenuItem(id) {
    return await db.delete(menu_item).where(eq(menu_item.id, id));
}
