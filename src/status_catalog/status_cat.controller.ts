import {
    serveAllStatusCatalog,
    serveStatusCatalog,
    fetchOneStatusCatalog,
    serveStatusCatalogUpdate,
    deleteStatusCatalog,
  } from "./status_cat.service.ts";
  import { status_catalog } from "../drizzle/schema";
  
  export async function getAllStatusCatalog(c) {
    const { limit } = c.req.query() as number;
    const status = await serveAllStatusCatalog(limit);
    try {
      if (status.length === 0) {
        return c.json({ message: "No registered status catalog" });
      }
      return c.json(status);
    } catch (error) {
      return c.json({ message: "Server error, try again later" }, 404);
    }
  }
  
  export async function getOneStatusCatalog(c) {
    const id = c.req.param("id") as number;
    const response = await fetchOneStatusCatalog(id);
    if (response.error) {
      return c.json({ error: response.fError }, 404);
    }
    return c.json(response);
  }
  
  export async function addStatusCatalog(c) {
    const orderStatus = await c.req.json("");
    const response = await serveStatusCatalog(orderStatus);
    if (response.error) {
      return c.json({ message: response.message }, 404);
    } else {
      return c.json(response);
    }
  }
  
  export async function updateStatusCatalog(c) {
    const id = c.req.param("id");
    const updateContent = await c.req.json("");
  
    const response = await serveStatusCatalogUpdate(id, updateContent);
  
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
  
  export async function deleteCatalogStatus(c) {
    const id = c.req.param("id") as number;
    const toBeDeleted = await deleteStatusCatalog(id);
    try {
      if (toBeDeleted.rowCount === 0) {
        return c.json({ message: "Status catalog does not exist" }, 404);
      } else {
        return c.json({ message: "Status catalog is deleted succesfully" });
      }
    } catch (error) {
      return c.json({ error: "Server error, try again later" }, 404);
    }
  }
  