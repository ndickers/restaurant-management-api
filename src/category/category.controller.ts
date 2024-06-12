import {
    serveAllCategory,
    serveCategory,
    fetchOneCategory,
    serveCategoryUpdate,
    deleteCategory,
  } from "./category.service.ts";
  import { category } from "../drizzle/schema";

  export async function getAllCategory(c) {
    const { limit } = c.req.query() as number;
    const status = await serveAllCategory(limit);
    try {
      if (status.length === 0) {
        return c.json({ message: "No registered category" },404);
      }
      return c.json(status);
    } catch (error) {
      return c.json({ message: "Server error, try again later" }, 404);
    }
  }
  
  export async function getOneCategory(c) {
    const id = c.req.param("id") as number;
    const response = await fetchOneCategory(id);
    if (response.error) {
      return c.json({ error: response.fError }, 404);
    }
    return c.json(response);
  }
  
  export async function addCategory(c) {
    const orderStatus = await c.req.json("");
    const response = await serveCategory(orderStatus);
    if (response.error) {
      return c.json({ message: response.message }, 404);
    } else {
      return c.json(response);
    }
  }
  
  export async function updateCategory(c) {
    const id = c.req.param("id");
    const updateContent = await c.req.json("");
  
    const response = await serveCategoryUpdate(id, updateContent);
  
    if (response.error) {
      return c.json({ message: response.message }, 404);
    }
    if (response.length === 0) {
      return c.json(
        { message: "The city does not exist. Create it first" },
        404
      );
    }
    return c.json(response);
  }
  
  export async function removeCategory(c) {
    const id = c.req.param("id") as number;
    const toBeDeleted = await deleteCategory(id);
    try {
      if (toBeDeleted.rowCount === 0) {
        return c.json({ message: "category does not exist" }, 404);
      } else {
        return c.json({ message: "category is deleted succesfully" });
      }
    } catch (error) {
      return c.json({ error: "Server error, try again later" }, 404);
    }
  }
  