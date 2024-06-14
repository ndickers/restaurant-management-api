import {
  serverAllDriver,
  addDriver,
  fetchOneDriver,
  deleteDriver,
  serveUpdate,
} from "./driver.service";
import { driver, TSDriver } from "../drizzle/schema";
import { Context } from "hono";

export async function getDrivers(c: Context) {
  const response = await serverAllDriver();
  try {
    if (response.length === 0) {
      return c.json({ message: "Currently there is no registered driver" });
    }
    return c.json(response);
  } catch (error) {
    return c.json(response, 404);
  }
}

export async function getOneDriver(c: Context) {
  const id: number = c.req.param("id");
  const response = await fetchOneDriver(id);
  try {
    if (Object.keys(response).length === 0) {
      return c.json({ message: "The driver is not registered" }, 404);
    }
    return c.json(response);
  } catch (error) {
    return c.json(error, 404);
  }
}

export async function postDriver(c: Context) {
  const driver = await c.req.json();

  const response = await addDriver(driver);
  try {
    if (response.length === 0) {
      return c.json({ message: "Driver was unable to be added" });
    }
    return c.json(response);
  } catch (error) {
    return c.json(error);
  }
}

export async function updateDriver(c: Context) {
  const id = c.req.param("id");
  const updateContent = await c.req.json("");
  const response = await serveUpdate(id, updateContent);
  try {
    if (Object.keys(response).length === 0) {
      return c.json({ message: "You cannot update non existing driver" });
    }
    return c.json(response);
  } catch (error) {
    return c.json(error);
  }
}

export async function removeDriver(c: Context) {
  const id:number = c.req.param("id");
  const response = await deleteDriver(id);
  try {
    if (response.length !== 0) {
      return c.json({ message: "Driver deleted successfully" });
    } else {
      return c.json({
        message: "You are trying to delete non existing driver",
      });
    }
  } catch (error) {
    return c.json(error);
  }
}
