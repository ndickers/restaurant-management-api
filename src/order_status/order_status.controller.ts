import {
  serveAllOrderStatus,
  serveOrderStatus,
  fetchOneOrderStatus,
  serveOrderStatusUpdate,
  deleteOrderStatus,
} from "./order_status.service";
import { order_status } from "../drizzle/schema";

export async function getAllOrderStatus(c) {
  const { limit } = c.req.query() as number;
  const status = await serveAllOrderStatus(limit);
  try {
    if (status.length === 0) {
      return c.json({ message: "No registered Restaurant" });
    }
    return c.json(status);
  } catch (error) {
    return c.json({ message: "Server error, try again later" }, 404);
  }
}

export async function getOneOrderStatus(c) {
  const id = c.req.param("id") as number;
  const response = await fetchOneOrderStatus(id);
  if (response.error) {
    return c.json({ error: response.fError }, 404);
  }
  return c.json(response);
}

export async function addOrderStatus(c) {
  const orderStatus = await c.req.json("");
  const response = await serveOrderStatus(orderStatus);
  if (response.error) {
    return c.json({ message: response.message }, 404);
  } else {
    return c.json(response);
  }
}

export async function updateOrderStatus(c) {
  const id = c.req.param("id");
  const updateContent = await c.req.json("");

  const response = await serveOrderStatusUpdate(id, updateContent);

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

export async function deleteStatusOrder(c) {
  const id = c.req.param("id") as number;
  const toBeDeleted = await deleteOrderStatus(id);
  try {
    if (toBeDeleted.rowCount === 0) {
      return c.json({ message: "Order status does not exist" }, 404);
    } else {
      return c.json({ message: "Order status is deleted succesfully" });
    }
  } catch (error) {
    return c.json({ error: "Server error, try again later" }, 404);
  }
}
