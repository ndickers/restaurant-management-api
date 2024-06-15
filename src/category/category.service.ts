import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { category, TSCategory, TICategory } from '../drizzle/schema';

export async function serveAllCategory(): Promise<TSCategory[] | null> {
  return await db.query.category.findMany({
    with: {
      menu_item: true,
    },
  });
}

export async function fetchOneCategory(id): Promise<TSCategory[]> {
  return await db.query.category.findMany({
    where: eq(category.id, id),
    with: {
      menu_item: true,
    },
  });
}

export async function serveCategory(newVal:TICategory) {
  return await db.insert(category).values(newVal);
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
