import {
  serveAllOwner,
  serveOwner,
  fetchOneOwner,
  serveOwnerUpdate,
  deleteResOwner,
} from "./owner.service";
import { restaurant_owner } from "../drizzle/schema";

export async function getAllOwner(c) {
  const { limit } = c.req.query() as number;
  const response = await serveAllOwner(limit);
  try {
    if (response.length === 0) {
      return c.json({
        message: "Currently there is no registered restaurant owner",
      });
    }
    return c.json(response);
  } catch (error) {
    return c.json(error, 404);
  }
}

export async function getOneOwner(c) {
  const id = c.req.param("id") as number;
  const response = await fetchOneOwner(id);
  try {
    if (response.length === 0) {
      return c.json({ message: "The owner does not exist" }, 404);
    }
    return c.json(response);
  } catch (error) {
    return c.json(error);
  }
}

export async function addOwner(c) {
  const newOwner = await c.req.json("");
  const response = await serveOwner(newOwner);
  try {
    if (response.length === 0) {
      return c.json({ message: "Unable to create new owner" }, 404);
    }
    return c.json(response);
  } catch (error) {
    return c.json(error);
  }
}

export async function updateOwner(c) {
  const id = c.req.param("id");
  const updateContent = await c.req.json("");

  const response = await serveOwnerUpdate(id, updateContent);
  try {
    if (response.length === 0) {
      return c.json({ message: "Unable to update restaurant owner" }, 404);
    }
    return c.json(response);
  } catch (error) {
    return c.json(error);
  }
}

export async function deleteOwner(c) {
  const id = c.req.param("id") as number;
  const response = await deleteResOwner(id);
  try {
    if (response.length === 0) {
      return c.json({ message: "Restaurant owner does not exist" }, 404);
    } else {
      return c.json({ message: "Restaurant owner is deleted succesfully" });
    }
  } catch (error) {
    return c.json(error, 404);
  }
}
