import {
  serveAllState,
  serveState,
  fetchOneState,
  serveStateUpdate,
  deleteState,
} from "./state.service";
import { state } from "../drizzle/schema";
import { Context } from "hono";

export async function getAllState(c: Context) {
  const response = await serveAllState();
  try {
    if (response.length === 0) {
      return c.json({ message: "The is no state currently" });
    }
    return c.json(response);
  } catch (error) {
    return c.json({ message: error });
  }
}

export async function getOneState(c:Context) {
  const id = Number(c.req.param("id"));
  const response = await fetchOneState(id);
  try {
    if (Object.keys(response).length === 0) {
      return c.json({ message: "The state does not exist" }, 404);
    }
    return c.json(response);
  } catch (error) {
    return c.json({ message: error });
  }
}

export async function addState(c:Context) {
  const newState = await c.req.json();
  const response = await serveState(newState);
  try {
    if (Object.keys(response).length === 0) {
      return c.json({ message: "Unable to add state" }, 404);
    } else {
      return c.json(response);
    }
  } catch (error) {
    return c.json({ message: error });
  }
}

export async function updateState(c:Context) {
  const id = Number(c.req.param("id"));
  const updateContent = await c.req.json();

  const response = await serveStateUpdate(id, updateContent);

  try {
    if (Object.keys(response).length === 0) {
      return c.json({ message: "Unable to update the state" }, 404);
    }
    return c.json(response);
  } catch (error) {
    return c.json({ message: error });
  }
}

export async function removeState(c:Context) {
  const id = Number(c.req.param("id"));
  const response = await deleteState(id);
  try {
    if (Object.keys(response).length === 0) {
      return c.json({ message: "State does not exist" }, 404);
    } else {
      return c.json({ message: "State is deleted succesfully" });
    }
  } catch (error) {
    return c.json({ message: error });
  }
}
