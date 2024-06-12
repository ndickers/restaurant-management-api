import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { category } from '../drizzle/schema';

export async function serveAllCategory(limit: number | undefined) {
  try {
    if (typeof limit === undefined) {
      return await db.query.category.findMany();
    }
    return await db.query.category.findMany();
  } catch (error) {
    return error;
  }
}

export async function fetchOneCategory(id) {
  try {
    const getOrderStatus = await db.query.category.findMany({
      where: eq(category.id, id),
    });
    if (getOrderStatus.length === 0) {
      return { message: "category not found" };
    }
    return getOrderStatus;
  } catch (error) {
    return {
      error: true,
      message: "Error try again later",
    };
  }
}

export async function serveCategory(orderStatus) {
  try {
    return await db.insert(category).values(orderStatus).returning(category);
  } catch (error) {
    return {
      error: true,
      message:
        "Make sure the item you are inserting is in the restaurant_owner and orders table ",
    };
  }
}

export async function serveCategoryUpdate(id, updates) {
  try {
    return await db
      .update(category)
      .set(updates)
      .where(eq(category.id, id))
      .returning({
        content: category,
      });
  } catch (error) {
    return { error: true, message: "Unable to update. Try again later" };
  }
}

export async function deleteCategory(id) {
  return await db.delete(category).where(eq(category.id, id));
}
