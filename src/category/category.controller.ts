import {
  serveAllCategory,
  serveCategory,
  fetchOneCategory,
  serveCategoryUpdate,
  deleteCategory,
} from "./category.service";
import { category } from "../drizzle/schema";
import { Context } from "hono";

export async function getAllCategory(c: Context) {
  const response = await serveAllCategory();
  try {
    if (response === null) {
      return c.json({ message: "No category found" });
    }
    return c.json(response);
  } catch (error) {
    return c.json({ message: error });
  }
}

export async function getOneCategory(c: Context) {
  const id = Number(c.req.param("id"));
  const response = await fetchOneCategory(id);
  try {
    if (response === null) {
      return c.json({ message: "No category found" });
    }
    return c.json(response);
  } catch (error) {
    return c.json({ message: error });
  }
}

export async function addCategory(c: Context) {
  const newDetails = await c.req.json();
  const response = await serveCategory(newDetails);
  try {
    if (response) {
      return c.json({
        message: "Category added successfully",
        content: response,
      });
    } else {
      return c.json({ message: "Unable to create new category" });
    }
  } catch (error) {
    return c.json({ message: error });
  }
}

export async function updateCategory(c: Context) {
  const id = Number(c.req.param("id"));
  const updateContent = await c.req.json();

  const response = await serveCategoryUpdate(id, updateContent);

  try {
    if (response === null) {
      return c.json({
        message: "The category you are trying to update, does not exist",
      });
    }
    return c.json({
      message: "Category updated successfully",
      content: response,
    });
  } catch (error) {
    return c.json({ message: error });
  }
}

export async function removeCategory(c: Context) {
  const id = Number(c.req.param("id"));
  const response = await deleteCategory(id);
  try {
    if (response !== null) {
      return c.json({ message: "Category deleted successfully" });
    } else {
      return c.json({ message: "You cannot delete non existing category" });
    }
  } catch (error) {
    return c.json(error, 404);
  }
}
