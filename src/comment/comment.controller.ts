import {
  serveAllComment,
  serveComment,
  fetchOneComment,
  serveCommentUpdate,
  deleteComment,
} from "./comment.service";
import { comment } from "../drizzle/schema";
import { Context } from "hono";

export async function getAllComment(c: Context) {
  const response = await serveAllComment();
  try {
    if (response === null) {
      return c.json({ message: "No registered comment" });
    }
    return c.json(response);
  } catch (error) {
    return c.json({ message: "Server error, try again later" }, 404);
  }
}

export async function getOneComment(c: Context) {
  const id = Number(c.req.param("id"));
  const response = await fetchOneComment(id);
  try {
    if (response === null) {
      return c.json({ message: "Comment is not found" }, 404);
    }
    return c.json(response);
  } catch (error) {
    return c.json(error);
  }
}

export async function addComment(c: Context) {
  const commentText = await c.req.json();
  const response = await serveComment(commentText);
  try {
    if (response) {
      return c.json({ message: "Comment added successfully" });
    } else {
      return c.json({ message: "Unable to add comment" });
    }
  } catch (error) {
    return c.json(error);
  }
}

export async function updateComment(c: Context) {
  const id = Number(c.req.param("id"));
  const updateContent = await c.req.json();

  const response = await serveCommentUpdate(id, updateContent);

  try {
    if (response === null) {
      return c.json({
        message: "You trying to update a comment that does not exist",
      });
    }
    return c.json(response);
  } catch (error) {
    return c.json(error);
  }
}

export async function removeComment(c: Context) {
  const id = Number(c.req.param("id"));
  const response = await deleteComment(id);
  try {
    if (response !== null) {
      return c.json({ message: "Comment deleted successfully" });
    } else {
      return c.json({ message: "You cannot delete non existing comment" });
    }
  } catch (error) {
    return c.json(error, 404);
  }
}
