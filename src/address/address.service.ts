import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { address } from "../drizzle/schema";

export async function serveAllAddress(limit: number | undefined) {
  try {
    if (typeof limit === undefined) {
      return await db.query.address.findMany();
    }
    return await db.query.address.findMany();
  } catch (error) {
    return error;
  }
}

export async function fetchOneAddress(id) {
  try {
    const getOrderStatus = await db.query.address.findMany({
      where: eq(address.id, id),
    });
    if (getOrderStatus.length === 0) {
      return { message: "address not found" };
    }
    return getOrderStatus;
  } catch (error) {
    return {
      error: true,
      message: "Error try again later",
    };
  }
}

export async function serveAddress(orderStatus) {
  try {
    return await db.insert(address).values(orderStatus).returning(address);
  } catch (error) {
    return {
      error: true,
      message: error,
    };
  }
}

export async function serveAddressUpdate(id, updates) {
  try {
    return await db
      .update(address)
      .set(updates)
      .where(eq(address.id, id))
      .returning({
        content: address,
      });
  } catch (error) {
    return { error: true, message: "Unable to update. Try again later" };
  }
}

export async function deleteAddress(id) {
  return await db.delete(address).where(eq(address.id, id));
}
