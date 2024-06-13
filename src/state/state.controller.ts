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
  const response = await serveAllState();
  try {
    if (response.length === 0) {
      return c.json({ message: "The is no state currently" });
    }
    return c.json(response);
  } catch (error) {
    return c.json(error, 404);
  }
}

export async function getOneState(c) {
  const id = c.req.param("id") as number;
  const response = await fetchOneState(id);
  try {
    if (response.length === 0) {
      return c.json({ message: "The state does not exist" }, 404);
    }
    return c.json(response);
  } catch (error) {
    return c.json(error);
  }
}

export async function addState(c) {
  const newState = await c.req.json("");
  const response = await serveState(newState);
  try {
    if (response.length === 0) {
      return c.json({ message: "Unable to add state" }, 404);
    } else {
      return c.json(response);
    }
  } catch (error) {
    return c.json(error);
  }
}

export async function updateState(c) {
  const id = c.req.param("id");
  const updateContent = await c.req.json("");

  const response = await serveStateUpdate(id, updateContent);

  try {
    if (response.length === 0) {
      return c.json({ message: "Unable to update the state" }, 404);
    }
    return c.json(response);
  } catch (error) {
    return c.json(error);
  }
}

export async function removeState(c) {
  const id = c.req.param("id") as number;
  const response = await deleteState(id);
  try {
    if (response.length === 0) {
      return c.json({ message: "State does not exist" }, 404);
    } else {
      return c.json({ message: "State is deleted succesfully" });
    }
  } catch (error) {
    return c.json(error, 404);
  }
}
