import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { address, TSaddress, TIddress, users } from "../drizzle/schema";

export async function serveAllAddress(): Promise<TSaddress[] | null> {
  return await db.query.address.findMany({
    with: {
      city: true,
      users: true,
      orders: true,
    },
  });
}

export async function fetchOneAddress(id: number): Promise<TIddress | null> {
  return await db.query.address.findMany({
    where: eq(address.id, id),
    with: {
      city: true,
      users: true,
      orders: true,
    },
  });
}

export async function addAddress(val): Promise<TSaddress> {
  return await db.insert(address).values(val).returning(address);
}

export async function serveAddressUpdate(id, updates) {
  return await db
    .update(address)
    .set(updates)
    .where(eq(address.id, id))
    .returning(address);
}

export async function deleteAddress(id) {
  return await db.delete(address).where(eq(address.id, id));
}
