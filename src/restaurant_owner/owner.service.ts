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
    return await db.query.restaurant_owner.findMany({
      with: {
        users: true,
        restaurant: true,
      },
    });
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
      return { message: "Restaurant owner status not found" };
    }
    return getOrderStatus;
  } catch (error) {
    return {
      error: true,
      message: "Error try again later",
    };
  }
}

export async function serveOwner(orderStatus) {
  try {
    return await db
      .insert(restaurant_owner)
      .values(orderStatus)
      .returning(restaurant_owner);
  } catch (error) {
    return {
      error: true,
      message:
        "Make sure the item you are inserting is in the restaurant_owner and orders table ",
    };
  }
}

export async function serveOwnerUpdate(id, updates) {
  try {
    return await db
      .update(restaurant_owner)
      .set(updates)
      .where(eq(restaurant_owner.id, id))
      .returning({
        content: restaurant_owner,
      });
  } catch (error) {
    return { error: true, message: "Unable to update. Try again later" };
  }
}

export async function deleteResOwner(id) {
  return await db.delete(restaurant_owner).where(eq(restaurant_owner.id, id));
}
