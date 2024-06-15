import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { comment, TIComment } from '../drizzle/schema';

export async function serveAllComment() {
  return await db.query.comment.findMany({
    with: {
      orders: true,
      users: true,
    },
  });
}

export async function fetchOneComment(id:number) {
  return await db.query.comment.findMany({
    where: eq(comment.id, id),
    with: {
      orders: true,
      users: true,
    },
  });
}

export async function serveComment(orderStatus:TIComment) {
  return await db.insert(comment).values(orderStatus);
}

export async function serveCommentUpdate(id:number, updates:TIComment) {
  return await db.update(comment).set(updates).where(eq(comment.id, id));
}

export async function deleteComment(id:number) {
  return await db.delete(comment).where(eq(comment.id, id));
}
