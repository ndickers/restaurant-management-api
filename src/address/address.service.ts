import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { address, TSaddress, TIaddress } from "../drizzle/schema";

export async function serveAllAddress(): Promise<TSaddress[] | undefined> {
  return await db.query.address.findMany({
    with: {
      city: true,
      users: true,
      orders: true,
    },
  });
}

export async function fetchOneAddress(
  id: number
): Promise<TSaddress[] | undefined> {
  return await db.query.address.findMany({
    where: eq(address.id, id),
    with: {
      city: true,
      users: true,
      orders: true,
    },
  });
}

export async function addAddress(val: TIaddress) {
  return await db.insert(address).values(val);
}

export async function serveAddressUpdate(id: number, updates: TIaddress) {
  return await db.update(address).set(updates).where(eq(address.id, id));
}

export async function deleteAddress(id: number) {
  return await db.delete(address).where(eq(address.id, id));
}
