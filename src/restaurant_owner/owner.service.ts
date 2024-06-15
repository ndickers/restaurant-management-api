import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { restaurant_owner, TIOwner } from '../drizzle/schema';

export async function serveAllOwner() {
  return await db.query.restaurant_owner.findMany({
    with: {
      users: true,
      restaurant: true,
    },
  });
}

export async function fetchOneOwner(id:number) {
  return await db.query.restaurant_owner.findMany({
    where: eq(restaurant_owner.id, id),
    with: {
      users: true,
      restaurant: true,
    },
  });
}

export async function serveOwner(orderStatus:TIOwner) {
  return await db.insert(restaurant_owner).values(orderStatus);
}

export async function serveOwnerUpdate(id:number, updates:TIOwner) {
  return await db
    .update(restaurant_owner)
    .set(updates)
    .where(eq(restaurant_owner.id, id));
}

export async function deleteResOwner(id:number) {
  return await db.delete(restaurant_owner).where(eq(restaurant_owner.id, id));
}
