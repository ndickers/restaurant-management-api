import {
  serverAllDriver,
  addDriver,
  fetchOneDriver,
  deleteDriver,
  serveUpdate,
} from "./driver.service";
import { driver } from "../drizzle/schema";

export async function getDrivers(c) {
  const { limit } = c.req.query() as number;
  const drivers = await serverAllDriver(limit);
  try {
    if (drivers.length === 0) {
      return c.json({ message: "Currently there is no registered user" });
    }
    return c.json(drivers);
  } catch (error) {
    return c.json({ message: "Server error, try again later" }, 404);
  }
}

export async function getOneDriver(c) {
  const id = c.req.param("id") as number;
  const singleDriver = await fetchOneDriver(id);
  try {
    if (singleDriver.length === 0) {
      return c.json({ message: "The driver is not registered" }, 404);
    }
    return c.json(singleDriver);
  } catch (error) {
    return c.json({ message: "Server error. Try again later" }, 404);
  }
  return c.json(singleDriver);
}

export async function postDriver(c) {
  const driver = await c.req.json();

  const addingDriver = await addDriver(driver);
  if (addingDriver === "cannot insert") {
    return c.json(
      {
        Error:
          "You cannot insert driver without creating an account. Add user first",
      },
      404
    );
  }

  return c.json(
    { message: "Driver created succesfull", content: addingDriver },
    200
  );
}

export async function updateDriver(c) {
  const id = c.req.param("id");
  const updateContent = await c.req.json("");

  const update = await serveUpdate(id, updateContent);

  if (update.name === "error") {
    return c.json(
      { message: "The field you've specified does not exist" },
      404
    );
  }
  if (update.length === 0) {
    return c.json({ message: "The user does not exist" }, 404);
  }
  return c.json(update);
}

export async function removeDriver(c) {
  const id = c.req.param("id") as number;
  const toBeDeleted = await deleteDriver(id);
  try {
    if (toBeDeleted.rowCount === 0) {
      return c.json({ message: "Driver is not registered" }, 404);
    } else {
      return c.json({ message: "Driver is deleted succesfully" });
    }
  } catch (error) {
    return c.json({ error: "Server error, try again later" }, 404);
  }
}
