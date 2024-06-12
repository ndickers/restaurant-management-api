import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { city } from "../drizzle/schema";

export async function serveAllCity(limit: number | undefined) {
  try {
    if (typeof limit === undefined) {
      return await db.query.city.findMany();
    }
    return await db.query.city.findMany();
  } catch (error) {
    return error;
  }
}

export async function fetchOneCity(id) {
  try {
    const getOrderStatus = await db.query.city.findMany({
      where: eq(city.id, id),
    });
    if (getOrderStatus.length === 0) {
      return { message: "city not found" };
    }
    return getOrderStatus;
  } catch (error) {
    return {
      error: true,
      message: "Error try again later",
    };
  }
}

export async function serveCity(orderStatus) {
  try {
    return await db.insert(city).values(orderStatus).returning(city);
  } catch (error) {
    return {
      error: true,
      message:
        "Make sure the item you are inserting is in the restaurant_owner and orders table ",
    };
  }
}

export async function serveCityUpdate(id, updates) {
  try {
    return await db
      .update(city)
      .set(updates)
      .where(eq(city.id, id))
      .returning({
        content: city,
      });
  } catch (error) {
    return { error: true, message: "Unable to update. Try again later" };
  }
}

export async function deleteCity(id) {
  return await db.delete(city).where(eq(city.id, id));
}
