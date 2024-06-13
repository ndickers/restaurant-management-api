import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { city, address } from "../drizzle/schema";

export async function serveAllCity() {
  return await db.query.city.findMany({
    with: {
      restaurant: true,
      state: true,
      address: true,
    },
  });
}

export async function fetchOneCity(id) {
  return await db.query.city.findMany({
    where: eq(city.id, id),
  });
}

export async function serveCity(orderStatus) {
  return await db.insert(city).values(orderStatus).returning(city);
}

export async function serveCityUpdate(id, updates) {
  return await db.update(city).set(updates).where(eq(city.id, id)).returning({
    content: city,
  });
}
export async function deleteCity(id) {
  return await db.delete(city).where(eq(city.id, id));
}
