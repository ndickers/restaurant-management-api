import {
  serveAllState,
  serveState,
  fetchOneState,
  serveStateUpdate,
  deleteState,
} from "./state.service.ts";
import { state } from "../drizzle/schema";

export async function getAllState(c) {
  const { limit } = c.req.query() as number;
  const status = await serveAllState(limit);
  try {
    if (status.length === 0) {
      return c.json({ message: "No registered restaurant owner" });
    }
    return c.json(status);
  } catch (error) {
    return c.json({ message: "Server error, try again later" }, 404);
  }
}

export async function getOneState(c) {
  const id = c.req.param("id") as number;
  const response = await fetchOneState(id);
  if (response.error) {
    return c.json({ error: response.fError }, 404);
  }
  return c.json(response);
}

export async function addState(c) {
  const orderStatus = await c.req.json("");
  const response = await serveState(orderStatus);
  if (response.error) {
    return c.json({ message: response.message }, 404);
  } else {
    return c.json(response);
  }
}

export async function updateState(c) {
  const id = c.req.param("id");
  const updateContent = await c.req.json("");

  const response = await serveStateUpdate(id, updateContent);

  if (response.error) {
    return c.json({ message: response.message }, 404);
  }
  if (response.length === 0) {
    return c.json(
      { message: "The restaurant owner does not exist. Create it first" },
      404
    );
  }
  return c.json(response);
}

export async function removeState(c) {
  const id = c.req.param("id") as number;
  const toBeDeleted = await deleteState(id);
  try {
    if (toBeDeleted.rowCount === 0) {
      return c.json({ message: "Restaurant owner does not exist" }, 404);
    } else {
      return c.json({ message: "Restaurant owner is deleted succesfully" });
    }
  } catch (error) {
    return c.json({ error: "Server error, try again later" }, 404);
  }
}
