import {
  serveAllMenuItem,
  serveMenuItem,
  fetchOneMenuItem,
  serveMenuItemUpdate,
  deleteMenuItem,
} from "./menu_item.service.ts";
import { order_status } from "../drizzle/schema";

export async function getAllMenuItem(c) {
  const { limit } = c.req.query() as number;
  const status = await serveAllMenuItem(limit);
  try {
    if (status.length === 0) {
      return c.json({ message: "No registered menu item" });
    }
    return c.json(status);
  } catch (error) {
    return c.json({ message: "Server error, try again later" }, 404);
  }
}

export async function getOneMenuItem(c) {
  const id = c.req.param("id") as number;
  const response = await fetchOneMenuItem(id);
  if (response.error) {
    return c.json({ error: response.fError }, 404);
  }
  return c.json(response);
}

export async function addMenuItem(c) {
  const orderStatus = await c.req.json("");
  const response = await serveMenuItem(orderStatus);
  if (response.error) {
    return c.json({ message: response.message }, 404);
  } else {
    return c.json(response);
  }
}

export async function updateMenuItem(c) {
  const id = c.req.param("id");
  const updateContent = await c.req.json("");

  const response = await serveMenuItemUpdate(id, updateContent);

  if (response.error) {
    return c.json({ message: response.message }, 404);
  }
  if (response.length === 0) {
    return c.json(
      { message: "The menu item does not exist. Create it first" },
      404
    );
  }
  return c.json(response);
}

export async function deleteStatusOrder(c) {
  const id = c.req.param("id") as number;
  const toBeDeleted = await deleteOrderStatus(id);
  try {
    if (toBeDeleted.rowCount === 0) {
      return c.json({ message: "Menu item does not exist" }, 404);
    } else {
      return c.json({ message: "Menu item is deleted succesfully" });
    }
  } catch (error) {
    return c.json({ error: "Server error, try again later" }, 404);
  }
}
