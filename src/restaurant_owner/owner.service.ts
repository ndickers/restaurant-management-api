import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { restaurant_owner } from "../drizzle/schema";

export async function serveAllOwner(limit: number | undefined) {
  try {
    if (typeof limit === undefined) {
      return await db.query.restaurant_owner.findMany({
        with: {
          users: true,
          restaurant: true,
        },
      });
    }
    return await db.query.restaurant_owner.findMany();
  } catch (error) {
    return error;
  }
}

export async function fetchOneOwner(id) {
  try {
    const getOrderStatus = await db.query.restaurant_owner.findMany({
      where: eq(restaurant_owner.id, id),
      with: {
        users: true,
        restaurant: true,
      },
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

export async function serveOrderStatus(orderStatus) {
  try {
    return await db
      .insert(order_status)
      .values(orderStatus)
      .returning(order_status);
  } catch (error) {
    return {
      error: true,
      message:
        "Make sure the item you are inserting is in the status_catalog and orders table ",
    };
  }
}

export async function serveOrderStatusUpdate(id, updates) {
  try {
    return await db
      .update(order_status)
      .set(updates)
      .where(eq(order_status.id, id))
      .returning({
        content: order_status,
      });
  } catch (error) {
    return { error: true, message: "Unable to update. Try again later" };
  }
}

export async function deleteOrderStatus(id) {
  return await db.delete(order_status).where(eq(order_status.id, id));
}
