import {
  serveAllOrderMenu,
  serveOrderMenu,
  fetchOneOrderMenu,
  serveOrderMenuUpdate,
  deleteOrderMenu,
} from "./order_menu.service.ts";
import { order_menu_item } from "../drizzle/schema";

export async function getAllOrderMenu(c) {
  const response = await serveAllOrderMenu();
  try {
    if (response.length === 0) {
      return c.json({ message: "No registered order menu item" });
    }
    return c.json(response);
  } catch (error) {
    return c.json(error, 404);
  }
}

export async function getOneOrderMenu(c) {
  const id = c.req.param("id") as number;
  const response = await fetchOneOrderMenu(id);
  try {
    if (response.length === 0) {
      return c.json({ message: "Order menu is currently empty" });
    }
    return c.json(response);
  } catch (error) {
    return c.json(error);
  }
}

export async function addOrderMenu(c) {
  const newOrderMenu = await c.req.json("");
  const response = await serveOrderMenu(newOrderMenu);
  try {
    if (response.length === 0) {
      return c.json({ message: "Unable to add new order menu" }, 404);
    } else {
      return c.json({
        message: "Order menu added succesfully",
        content: response,
      });
    }
  } catch (error) {
    return c.json(error);
  }
}

export async function updateOrderMenu(c) {
  const id = c.req.param("id");
  const updateContent = await c.req.json("");

  const response = await serveOrderMenuUpdate(id, updateContent);

  try {
    if (response.length === 0) {
      return c.json({ message: "Order menu does not exist" }, 404);
    }
    return c.json(response);
  } catch (error) {
    return c.json(error);
  }
}

export async function removeOrderMenu(c) {
  const id = c.req.param("id") as number;
  const response = await deleteOrderMenu(id);
  try {
    if (response.length === 0) {
      return c.json({ message: "Order menu item does not exist" }, 404);
    } else {
      return c.json({ message: "Order menu item is deleted succesfully" });
    }
  } catch (error) {
    return c.json(error, 404);
  }
}
