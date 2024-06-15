import {
  serveAllRest,
  fetchOneRest,
  addRest,
  serveUpdate,
  deleteRest,
} from "./restaurant.service";

export async function getAllRestaurant(c) {
  const response = await serveAllRest();
  try {
    if (response.length === 0) {
      return c.json({ message: "No registered Restaurant" });
    }
    return c.json(response);
  } catch (error) {
    return c.json(error, 404);
  }
}

export async function getResturant(c) {
  const id = c.req.param("id") as number;
  const response = await fetchOneRest(id);
  try {
    if (response === null) {
      return c.json({ message: "The restaurant is not registered" }, 404);
    }
    return c.json(response);
  } catch (error) {
    return c.json(error, 404);
  }
}

export async function postResturant(c) {
  const restDetail = await c.req.json();

  const response = await addRest(restDetail);
  try {
    if (response === null) {
      return c.json(
        {
          error: "restaurant fail to create",
        },
        404
      );
    }
    return c.json(response);
  } catch (error) {
    return c.json(error);
  }
}

export async function updateResturant(c) {
  const id = c.req.param("id");
  const updateContent = await c.req.json("");

  const response = await serveUpdate(id, updateContent);

  try {
    if (response === null) {
      return c.json({ message: "The restaurant does not exist" }, 404);
    }
    return c.json(response);
  } catch (error) {
    return c.json(error);
  }
}
export async function removeResturant(c) {
  const id = c.req.param("id") as number;
  const response = await deleteRest(id);
  try {
    if (response === null) {
      return c.json({ message: "Restaurant does not exist" }, 404);
    } else {
      return c.json({ message: "Restaurant is deleted succesfully" });
    }
  } catch (error) {
    return c.json(error, 404);
  }
}
