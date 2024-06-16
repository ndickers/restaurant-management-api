import {
  serveAllAddress,
  addAddress,
  fetchOneAddress,
  serveAddressUpdate,
  deleteAddress,
} from "./address.service"
import { address } from "../drizzle/schema";
import { Context } from "hono";

export async function getAllAddress(c: Context) {
  const response = await serveAllAddress();
  try {
    if (response === null) {
      return c.json({ message: "No registered address" }, 404);
    } else {
      return c.json(response);
    }
  } catch (error) {
    return c.json({ message: error });
  }
}

export async function getOneAddress(c: Context) {
  const id = Number(c.req.param("id"));
  const response = await fetchOneAddress(id);
  try {
    if (response === null) {
      return c.json({ message: "Address not found. Add it first" });
    }
    return c.json(response);
  } catch (error) {
    return c.json({ message: error });
  }
}

export async function createAddress(c: Context) {
  const newDetails = await c.req.json();
  const response = await addAddress(newDetails);
  try {
    if (response !== null) {
      return c.json(response);
    } else {
      return c.json({ message: "Unable to create address" });
    }
  } catch (error) {
    return c.json({ message: error });
  }
}

export async function updateAddress(c: Context) {
  const id = Number(c.req.param("id"));
  const updateContent = await c.req.json();
  const response = await serveAddressUpdate(id, updateContent);
  try {
    if (response !== null) {
      return c.json({
        message: "Address updated successfully",
        content: response,
      });
    } else {
      return c.json({ error: "No address in the database" });
    }
  } catch (error) {
    return c.json({ message: error });
  }
}

export async function removeAddress(c:Context) {
  const id = Number(c.req.param("id"));
  const response = await deleteAddress(id);
  try {
    if (response) {
      return c.json({ message: "address deleted successfully" });
    } else {
      return c.json({ message: "Unable to delete address" });
    }
  } catch (error) {
    return c.json({ message: error });
  }
}
