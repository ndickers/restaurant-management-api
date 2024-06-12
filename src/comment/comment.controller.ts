import {
  serveAllComment,
  serveComment,
  fetchOneComment,
  serveCommentUpdate,
  deleteComment,
} from "./comment.service.ts";
import { comment } from "../drizzle/schema";

export async function getAllComment(c) {
  const { limit } = c.req.query() as number;
  const status = await serveAllComment(limit);
  try {
    if (status.length === 0) {
      return c.json({ message: "No registered comment" });
    }
    return c.json(status);
  } catch (error) {
    return c.json({ message: "Server error, try again later" }, 404);
  }
}

export async function getOneComment(c) {
  const id = c.req.param("id") as number;
  const response = await fetchOneComment(id);
  if (response.error) {
    return c.json({ error: response.fError }, 404);
  }
  return c.json(response);
}

export async function addComment(c) {
  const orderStatus = await c.req.json("");
  const response = await serveComment(orderStatus);
  if (response.error) {
    return c.json({ message: response.message }, 404);
  } else {
    return c.json(response);
  }
}

export async function updateComment(c) {
  const id = c.req.param("id");
  const updateContent = await c.req.json("");

  const response = await serveCommentUpdate(id, updateContent);

  if (response.error) {
    return c.json({ message: response.message }, 404);
  }
  if (response.length === 0) {
    return c.json(
      { message: "The comment does not exist. Create it first" },
      404
    );
  }
  return c.json(response);
}

export async function removeComment(c) {
  const id = c.req.param("id") as number;
  const toBeDeleted = await deleteComment(id);
  try {
    if (toBeDeleted.rowCount === 0) {
      return c.json({ message: "Comment item does not exist" }, 404);
    } else {
      return c.json({ message: "Comment item is deleted succesfully" });
    }
  } catch (error) {
    return c.json({ error: "Server error, try again later" }, 404);
  }
}
