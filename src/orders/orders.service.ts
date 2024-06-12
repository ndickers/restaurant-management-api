import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { orders } from "../drizzle/schema";
export async function serverAllOrders(limit: number | undefined) {
  try {
    if (typeof limit === undefined) {
      return await db.query.orders.findMany({
        with: {
          user: true,
          driver: true,
          restaurant: true,
          order_status: true,
          order_menu_item: true,
        },
      });
    }
    return await db.query.orders.findMany({
      limit: limit,
      with: {
        user: true,
        driver: true,
        restaurant: true,
        order_status: true,
        order_menu_item: true,
      },
    });
  } catch (error) {
    return {
      error: true,
      message: "Cannot fetch now. Try again later",
    };
  }
}

export async function createOrder(orderDetail) {
  try {
    return await db.insert(orders).values(orderDetail).returning(orders);
  } catch (error) {
    return {
      error: true,
      message:
        "The restaurant_id, user_id or driver_id you provided, are not created in their respective table.",
    };
  }
}

export async function fetchOneOrder(id) {
  try {
    return await db.query.orders.findMany({
      where: eq(orders.id, id),
      with: {
        user: true,
        driver: true,
        restaurant: true,
        order_status: true,
        order_menu_item: true,
      },
    });
  } catch (error) {
    return {
      error: true,
      message: "Try again later. The data cannot be fetched",
    };
  }
}

export async function serveOrderUpdate(id, updates) {
  try {
    return await db
      .update(orders)
      .set(updates)
      .where(eq(orders.id, id))
      .returning({
        content: orders,
      });
  } catch (error) {
    return { error: true, message: "Unable to update. Try again later" };
  }
}

export async function deleteOrder(id) {
  return await db.delete(orders).where(eq(orders.id, id));
}
