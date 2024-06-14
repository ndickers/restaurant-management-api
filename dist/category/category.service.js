import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { category } from "../drizzle/schema";
export async function serveAllCategory() {
    return await db.query.category.findMany({
        with: {
            menu_item: true,
        },
    });
}
export async function fetchOneCategory(id) {
    return await db.query.category.findMany({
        where: eq(category.id, id),
        with: {
            menu_item: true,
        },
    });
}
export async function serveCategory(newVal) {
    return await db.insert(category).values(newVal).returning(category);
}
export async function serveCategoryUpdate(id, updates) {
    return await db
        .update(category)
        .set(updates)
        .where(eq(category.id, id))
        .returning({
        content: category,
    });
}
export async function deleteCategory(id) {
    return await db.delete(category).where(eq(category.id, id));
}