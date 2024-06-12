import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { order_menu_item } from "../drizzle/schema";

export async function serveAllOrderMenu(limit: number | undefined) {
  try {
    if (typeof limit === undefined) {
      return await db.query.order_menu_item.findMany({
        with: {
          orders: true,
          menu_item: true,
        },
      });
    }
    return await db.query.order_menu_item.findMany({
      with: {
        orders: true,
        menu_item: true,
      },
    });
  } catch (error) {
    return error;
  }
}

export async function fetchOneOrderMenu(id) {
  try {
    const getOrderStatus = await db.query.order_menu_item.findMany({
      where: eq(order_menu_item.id, id),
      with: {
        orders: true,
        menu_item: true,
      },
    });
    if (getOrderStatus.length === 0) {
      return { message: "Order menu item not found" };
    }
    return getOrderStatus;
  } catch (error) {
    return {
      error: true,
      message: "Error try again later",
    };
  }
}

export async function serveOrderMenu(orderStatus) {
  try {
    return await db
      .insert(order_menu_item)
      .values(orderStatus)
      .returning(order_menu_item);
  } catch (error) {
    return {
      error: true,
      message: "Make sure the item you are inserting is in primary table ",
    };
  }
}

export async function serveOrderMenuUpdate(id, updates) {
  try {
    return await db
      .update(order_menu_item)
      .set(updates)
      .where(eq(order_menu_item.id, id))
      .returning({
        content: order_menu_item,
      });
  } catch (error) {
    return { error: true, message: "Unable to update. Try again later" };
  }
}

export async function deleteOrderMenu(id) {
  return await db.delete(order_menu_item).where(eq(order_menu_item.id, id));
}
