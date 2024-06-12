import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { state } from "../drizzle/schema";

export async function serveAllState(limit: number | undefined) {
  try {
    if (typeof limit === undefined) {
      return await db.query.state.findMany();
    }
    return await db.query.state.findMany();
  } catch (error) {
    return error;
  }
}

export async function fetchOneState(id) {
  try {
    const getOrderStatus = await db.query.state.findMany({
      where: eq(state.id, id),
    });
    if (getOrderStatus.length === 0) {
      return { message: "state status not found" };
    }
    return getOrderStatus;
  } catch (error) {
    return {
      error: true,
      message: "Error try again later",
    };
  }
}

export async function serveState(orderStatus) {
  try {
    return await db.insert(state).values(orderStatus).returning(state);
  } catch (error) {
    return {
      error: true,
      message:
        "Make sure the item you are inserting is in the restaurant_owner and orders table ",
    };
  }
}

export async function serveStateUpdate(id, updates) {
  try {
    return await db
      .update(state)
      .set(updates)
      .where(eq(state.id, id))
      .returning({
        content: state,
      });
  } catch (error) {
    return { error: true, message: "Unable to update. Try again later" };
  }
}

export async function deleteState(id) {
  return await db.delete(state).where(eq(state.id, id));
}
