import {
  serveAllMenuItem,
  serveMenuItem,
  fetchOneMenuItem,
  serveMenuItemUpdate,
  deleteMenuItem,
} from "./menu_item.service.ts";
import { order_status } from "../drizzle/schema";

export async function getAllMenuItem(c) {
  const response = await serveAllMenuItem();
  try {
    if (response.length === 0) {
      return c.json({ message: "No registered menu item" });
    }
    return c.json(response);
  } catch (error) {
    return c.json(error, 404);
  }
}

export async function getOneMenuItem(c) {
  const id = c.req.param("id") as number;
  const response = await fetchOneMenuItem(id);
  try {
    if (response.length === 0) {
      return c.json({ message: "The list menu does not exist" });
    }
    return c.json(response);
  } catch (error) {
    return c.json(error);
  }
}

export async function addMenuItem(c) {
  const newItemMenu = await c.req.json("");
  const response = await serveMenuItem(newItemMenu);
  try {
    if (response) {
      return c.json({
        message: "Menu item added  succesfully",
        content: response,
      });
    } else {
      return c.json({ message: "List item was not successfully added" });
    }
  } catch (error) {
    return c.json(error);
  }
}

export async function updateMenuItem(c) {
  const id = c.req.param("id");
  const updateContent = await c.req.json("");

  const response = await serveMenuItemUpdate(id, updateContent);

  try {
    if (response.length === 0) {
      return c.json(
        { message: "You cannot update non existsing menu item" },
        404
      );
    }
    return c.json(response);
  } catch (error) {
    return c.json(error);
  }
}

export async function deleteStatusOrder(c) {
  const id = c.req.param("id") as number;
  const response = await deleteOrderStatus(id);
  try {
    if (response.length !== 0) {
      return c.json({ message: "Menu item does not exist" }, 404);
    } else {
      return c.json({ message: "Menu item is deleted succesfully" });
    }
  } catch (error) {
    return c.json(error, 404);
  }
}
