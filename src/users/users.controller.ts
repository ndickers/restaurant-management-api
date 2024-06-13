import { Context } from "hono";
import { TSUser } from "../drizzle/schema";

import {
  serveAllUsers,
  serveOneUser,
  addToService,
  updateWhole,
  deleteService,
} from "./users.service";

export async function getAllUsers(c: Context) {
  const response = await serveAllUsers();
  try {
    if (response === null) {
      return c.error("Users cannot be fetched");
    }
    if (response.length === 0) {
      return c.json({ message: "There is no user currently" });
    }
    return c.json(response);
  } catch (error) {
    return c.json(error);
  }
}

export async function getOneUser(c: Context) {
  const id = c.req.param("id") as number;
  const response = await serveOneUser(id);
  try {
    if (response.length === 0) {
      return c.json({ message: "The user does not exist" }, 404);
    }
    return c.json(response);
  } catch (error) {
    return c.json(error);
  }
}

export async function addNewUser(c: Context) {
  const newUser = await c.req.json();
  const response = await addToService(newUser);
  try {
    if (response.length === 0) {
      return c.json({ message: "Unable to add the user" });
    }
    return c.json({ message: "created succesfully", content: response });
  } catch (error) {
    return c.json(error);
  }
}

export async function updateWholeUser(c: Context) {
  const id = (await c.req.param("id")) as number;
  const updateUser = await c.req.json();
  const response = await updateWhole(id, updateUser);
  try {
    if (response.length === 0) {
      return c.json(
        {
          error: "Unable to update the user",
        },
        404
      );
    }
    return c.json({ message: "User succesfully updated", content: response });
  } catch (error) {
    return c.json({ error });
  }
}

export async function deleteUser(c) {
  const id = (await c.req.param("id")) as number;
  const response = await deleteService(id);
  try {
    if (response.length === 0) {
      return c.json({ message: "Unable to delete the user" });
    }
    return c.json({ message: "Deleted succesful" });
  } catch (error) {
    return c.json(error, 404);
  }
}
