import {
  serveAllAddress,
  serveAddress,
  fetchOneAddress,
  serveAddressUpdate,
  deleteAddress,
} from "./address.service.ts";
import { address } from "../drizzle/schema";

export async function getAllAddress(c) {
  const { limit } = c.req.query() as number;
  const status = await serveAllAddress(limit);
  try {
    if (status.length === 0) {
      return c.json({ message: "No registered address" }, 404);
    }
    return c.json(status);
  } catch (error) {
    return c.json({ message: "Server error, try again later" }, 404);
  }
}

export async function getOneAddress(c) {
  const id = c.req.param("id") as number;
  const response = await fetchOneAddress(id);
  if (response.error) {
    return c.json({ error: response.fError }, 404);
  }
  return c.json(response);
}

export async function addAddress(c) {
  const orderStatus = await c.req.json("");
  const response = await serveAddress(orderStatus);
  if (response.error) {
    return c.json({ message: response.message }, 404);
  } else {
    return c.json(response);
  }
}

export async function updateAddress(c) {
  const id = c.req.param("id");
  const updateContent = await c.req.json("");

  const response = await serveAddressUpdate(id, updateContent);

  if (response.error) {
    return c.json({ message: response.message }, 404);
  }
  if (response.length === 0) {
    return c.json({ message: "The address does not exist. Create it first" }, 404);
  }
  return c.json(response);
}

export async function removeAddress(c) {
  const id = c.req.param("id") as number;
  const toBeDeleted = await deleteAddress(id);
  try {
    if (toBeDeleted.rowCount === 0) {
      return c.json({ message: "address does not exist" }, 404);
    } else {
      return c.json({ message: "address is deleted succesfully" });
    }
  } catch (error) {
    return c.json({ error: "Server error, try again later" }, 404);
  }
}
