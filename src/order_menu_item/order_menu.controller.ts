import {
  serveAllOrderMenu,
  serveOrderMenu,
  fetchOneOrderMenu,
  serveOrderMenuUpdate,
  deleteOrderMenu,
} from "./order_menu.service";
import { order_menu_item } from "../drizzle/schema";
import { Context } from "hono";

export async function getAllOrderMenu(c: Context) {
  const response = await serveAllOrderMenu();
  try {
    if (response === null) {
      return c.json({ message: "No registered order menu item" });
    }
    return c.json(response);
  } catch (error) {
    return c.json(error, 404);
  }
}

export async function getOneOrderMenu(c: Context) {
  const id = Number(c.req.param("id"));
  const response = await fetchOneOrderMenu(id);
  try {
    if (response === null) {
      return c.json({ message: "Order menu is currently empty" });
    }
    return c.json(response);
  } catch (error) {
    return c.json(error);
  }
}

export async function addOrderMenu(c: Context) {
  const newOrderMenu = await c.req.json();
  const response = await serveOrderMenu(newOrderMenu);
  try {
    if (response === null) {
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

export async function updateOrderMenu(c: Context) {
  const id = Number(c.req.param("id"));
  const updateContent = await c.req.json();

  const response = await serveOrderMenuUpdate(id, updateContent);

  try {
    if (response === null) {
      return c.json({ message: "Order menu does not exist" }, 404);
    }
    return c.json(response);
  } catch (error) {
    return c.json({ message: error });
  }
}

export async function removeOrderMenu(c: Context) {
  const id = Number(c.req.param("id"));
  const response = await deleteOrderMenu(id);
  try {
    if (response === null) {
      return c.json({ message: "Order menu item does not exist" }, 404);
    } else {
      return c.json({ message: "Order menu item is deleted succesfully" });
    }
  } catch (error) {
    return c.json({ message: error });
  }
}
