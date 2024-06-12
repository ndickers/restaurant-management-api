import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { restaurant } from '../drizzle/schema';
export async function serveAllRest(limit: number | undefined) {
  try {
    if (typeof limit === undefined) {
      return await db.query.restaurant.findMany({
        with: {
          restaurant_owner: true,
          orders: true,
        },
      });
    }
    return await db.query.restaurant.findMany({
      limit: limit,
      with: {
        restaurant_owner: true,
        orders: true,
      },
    });
  } catch (error) {
    return error;
  }
}

export async function fetchOneRest(id) {
  return await db.query.restaurant.findMany({
    where: eq(restaurant.id, id),
    with: {
      restaurant_owner: true,
      orders: true,
    },
  });
}

export async function addRest(restDetail) {
  try {
    return await db.insert(restaurant).values(restDetail).returning(restaurant);
  } catch (error) {
    return "cannot insert";
  }
}

export async function serveUpdate(id, restUpdates) {
  try {
    return await db
      .update(restaurant)
      .set(restUpdates)
      .where(eq(restaurant.id, id))
      .returning({
        content: restaurant,
      });
  } catch (error) {
    return error;
  }
}


export async function deleteRest(id) {
    return await db.delete(restaurant).where(eq(restaurant.id, id));
  }
  