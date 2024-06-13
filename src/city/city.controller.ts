import {
  serveAllCity,
  serveCity,
  fetchOneCity,
  serveCityUpdate,
  deleteCity,
} from "./city.service.ts";
import { city, stateRelation } from "../drizzle/schema";

export async function getAllCity(c) {
  const response = await serveAllCity();
  try {
    if (response.length === 0) {
      return c.json({ message: "No registered category" });
    }
    return c.json(response);
  } catch (error) {
    return c.json(error, 404);
  }
}

export async function getOneCity(c) {
  const id = c.req.param("id") as number;
  const response = await fetchOneCity(id);
  try {
    if (response.length === 0) {
      return c.json({ message: "No registered city" }, 404);
    } else {
      return c.json(response);
    }
  } catch (error) {
    return c.json(error);
  }
}

export async function addCity(c) {
  const newDetails = await c.req.json("");
  const response = await serveCity(newDetails);
  try {
    if (response.length === 0) {
      return c.json({ message: "You  cannot update non existing city" });
    } else {
      return c.json(response);
    }
  } catch (error) {
    return c.json(error);
  }
}

export async function updateCity(c) {
  const id = c.req.param("id");
  const updateContent = await c.req.json("");

  const response = await serveCityUpdate(id, updateContent);
  try {
    if (response.length === 0) {
      return c.json(
        { message: "The city does not exist. Create it first" },
        404
      );
    }
    return c.json(response);
  } catch (error) {
    return c.json(error, 404);
  }
}

export async function removeCity(c) {
  const id = c.req.param("id") as number;
  const response = await deleteCity(id);
  try {
    if (response.length !== 0) {
      return c.json({ message: "Category deleted successfully" });
    } else {
      return c.json({ message: "You cannot delete non existing category" });
    }
  } catch (error) {
    return c.json(error, 404);
  }
}
