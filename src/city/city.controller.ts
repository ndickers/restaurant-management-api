import {
    serveAllCity,
    serveCity,
    fetchOneCity,
    serveCityUpdate,
    deleteCity,
  } from "./city.service.ts";
  import { city } from "../drizzle/schema";

  export async function getAllCity(c) {
    const { limit } = c.req.query() as number;
    const status = await serveAllCity(limit);
    try {
      if (status.length === 0) {
        return c.json({ message: "No registered city" },404);
      }
      return c.json(status);
    } catch (error) {
      return c.json({ message: "Server error, try again later" }, 404);
    }
  }
  
  export async function getOneCity(c) {
    const id = c.req.param("id") as number;
    const response = await fetchOneCity(id);
    if (response.error) {
      return c.json({ error: response.fError }, 404);
    }
    return c.json(response);
  }
  
  export async function addCity(c) {
    const orderStatus = await c.req.json("");
    const response = await serveCity(orderStatus);
    if (response.error) {
      return c.json({ message: response.message }, 404);
    } else {
      return c.json(response);
    }
  }
  
  export async function updateCity(c) {
    const id = c.req.param("id");
    const updateContent = await c.req.json("");
  
    const response = await serveCityUpdate(id, updateContent);
  
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
  
  export async function removeCity(c) {
    const id = c.req.param("id") as number;
    const toBeDeleted = await deleteCity(id);
    try {
      if (toBeDeleted.rowCount === 0) {
        return c.json({ message: "City does not exist" }, 404);
      } else {
        return c.json({ message: "City is deleted succesfully" });
      }
    } catch (error) {
      return c.json({ error: "Server error, try again later" }, 404);
    }
  }
  