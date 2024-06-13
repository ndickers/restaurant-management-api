import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { comment } from "../drizzle/schema";

export async function serveAllComment() {
  return await db.query.comment.findMany({
    with: {
      orders: true,
      users: true,
    },
  });
}

export async function fetchOneComment(id) {
  return await db.query.comment.findMany({
    where: eq(comment.id, id),
    with: {
      orders: true,
      users: true,
    },
  });
}

export async function serveComment(orderStatus) {
  return await db.insert(comment).values(orderStatus).returning(comment);
}

export async function serveCommentUpdate(id, updates) {
  return await db
    .update(comment)
    .set(updates)
    .where(eq(comment.id, id))
    .returning({
      content: comment,
    });
}

export async function deleteComment(id) {
  return await db.delete(comment).where(eq(comment.id, id));
}
