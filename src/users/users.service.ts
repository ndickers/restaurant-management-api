import db from "../drizzle/db";
import { users, driver, restaurant } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export async function serveAllUsers() {
  return await db.query.users.findMany({
    with: {
      driver: true,
      restaurant_owner: true,
      orders: true,
    },
  });
}

export async function serveOneUser(id) {
  return await db.query.users.findMany({
    where: eq(users.id, id),
    with: {
      driver: true,
      restaurant_owner: true,
      orders: true,
    },
  });
}
export async function addToService(user) {
  return await db.insert(users).values(user);
}

export async function updateWhole(id, user) {
  const date = new Date();
  const time = date.toLocaleTimeString("en-US");

  return await await db
    .update(users)
    .set({ ...user, updated_at: time })
    .where(eq(users.id, id));
}

export async function deleteService(id) {
  return await db.delete(users).where(eq(users.id, id));
}
