import {
  serveAllOrderMenu,
  serveOrderMenu,
  fetchOneOrderMenu,
  serveOrderMenuUpdate,
  deleteOrderMenu,
} from "./order_menu.service.ts";
import { order_menu_item } from "../drizzle/schema";

export async function getAllOrderMenu(c) {
  const { limit } = c.req.query() as number;
  const status = await serveAllOrderMenu(limit);
  try {
    if (status.length === 0) {
      return c.json({ message: "No registered order menu item" });
    }
    return c.json(status);
  } catch (error) {
    return c.json({ message: "Server error, try again later" }, 404);
  }
}

export async function getOneOrderMenu(c) {
  const id = c.req.param("id") as number;
  const response = await fetchOneOrderMenu(id);
  if (response.error) {
    return c.json({ error: response.fError }, 404);
  }
  return c.json(response);
}

export async function addOrderMenu(c) {
  const orderStatus = await c.req.json("");
  const response = await serveOrderMenu(orderStatus);
  if (response.error) {
    return c.json({ message: response.message }, 404);
  } else {
    return c.json(response);
  }
}

export async function updateOrderMenu(c) {
  const id = c.req.param("id");
  const updateContent = await c.req.json("");

  const response = await serveOrderMenuUpdate(id, updateContent);

  if (response.error) {
    return c.json({ message: response.message }, 404);
  }
  if (response.length === 0) {
    return c.json(
      { message: "The order_status does not exist. Create it first" },
      404
    );
  }
  return c.json(response);
}

export async function removeOrderMenu(c) {
  const id = c.req.param("id") as number;
  const toBeDeleted = await deleteOrderMenu(id);
  try {
    if (toBeDeleted.rowCount === 0) {
      return c.json({ message: "Order menu item does not exist" }, 404);
    } else {
      return c.json({ message: "Order menu item is deleted succesfully" });
    }
  } catch (error) {
    return c.json({ error: "Server error, try again later" }, 404);
  }
}
