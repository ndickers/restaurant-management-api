import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { menu_item } from "../drizzle/schema";

export async function serveAllMenuItem(limit: number | undefined) {
  try {
    if (typeof limit === undefined) {
      return await db.query.menu_item.findMany();
    }
    return await db.query.menu_item.findMany();
  } catch (error) {
    return error;
  }
}

export async function fetchOneMenuItem(id) {
  try {
    const getOrderStatus = await db.query.menu_item.findMany({
      where: eq(menu_item.id, id),
    });
    if (getOrderStatus.length === 0) {
      return { message: "Order status not found" };
    }
    return getOrderStatus;
  } catch (error) {
    return {
      error: true,
      message: "Error try again later",
    };
  }
}

export async function serveMenuItem(orderStatus) {
  try {
    return await db.insert(menu_item).values(orderStatus).returning(menu_item);
  } catch (error) {
    return {
      error: true,
      message:
        "Make sure the item you are inserting is in the status_catalog and orders table ",
    };
  }
}

export async function serveMenuItemUpdate(id, updates) {
  try {
    return await db
      .update(menu_item)
      .set(updates)
      .where(eq(menu_item.id, id))
      .returning({
        content: menu_item,
      });
  } catch (error) {
    return { error: true, message: "Unable to update. Try again later" };
  }
}

export async function deleteMenuItem(id) {
  return await db.delete(menu_item).where(eq(menu_item.id, id));
}
