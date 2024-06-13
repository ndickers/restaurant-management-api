import db from "../drizzle/db";
import { users, driver, restaurant, TIUser, TSUser } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export async function serveAllUsers(): Promise<TSUser[] | null> {
  return await db.query.users.findMany({
    with: {
      driver: true,
      restaurant_owner: true,
      orders: true,
      comment: true,
      address: true,
    },
  });
}

export async function serveOneUser(id: number): Promise<TSUser | null> {
  return await db.query.users.findMany({
    where: eq(users.id, id),
    with: {
      driver: true,
      restaurant_owner: true,
      orders: true,
      comment: true,
      address: true,
    },
  });
}
export async function addToService(user: TIUser): Promise<TSUser | null> {
  return await db.insert(users).values(user);
}

export async function updateWhole(id: number, user: TIUser) {
  return await db
    .update(users)
    .set(user)
    .where(eq(users.id, id))
    .returning(users);
}

export async function deleteService(id: number) {
  return await db.delete(users).where(eq(users.id, id));
}
