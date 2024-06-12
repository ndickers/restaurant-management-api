import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { comment } from "../drizzle/schema";

export async function serveAllComment(limit: number | undefined) {
  try {
    if (typeof limit === undefined) {
      return await db.query.comment.findMany();
    }
    return await db.query.comment.findMany();
  } catch (error) {
    return error;
  }
}

export async function fetchOneComment(id) {
  try {
    const getOrderStatus = await db.query.comment.findMany({
      where: eq(comment.id, id),
    });
    if (getOrderStatus.length === 0) {
      return { message: "Order comment not found" };
    }
    return getOrderStatus;
  } catch (error) {
    return {
      error: true,
      message: "Error try again later",
    };
  }
}

export async function serveComment(orderStatus) {
  try {
    return await db.insert(comment).values(orderStatus).returning(comment);
  } catch (error) {
    return {
      error: true,
      message: "Make sure the item you are inserting is in primary table ",
    };
  }
}

export async function serveCommentUpdate(id, updates) {
  try {
    return await db
      .update(comment)
      .set(updates)
      .where(eq(comment.id, id))
      .returning({
        content: comment,
      });
  } catch (error) {
    return { error: true, message: "Unable to update. Try again later" };
  }
}

export async function deleteComment(id) {
  return await db.delete(comment).where(eq(comment.id, id));
}
