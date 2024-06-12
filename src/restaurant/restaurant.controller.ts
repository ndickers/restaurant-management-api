import {
  serveAllRest,
  fetchOneRest,
  addRest,
  serveUpdate,
  deleteRest,
} from "./restaurant.service";

export async function getAllRestaurant(c) {
  const { limit } = c.req.query() as number;
  const rest = await serveAllRest(limit);
  try {
    if (rest.length === 0) {
      return c.json({ message: "No registered Restaurant" });
    }
    return c.json(rest);
  } catch (error) {
    return c.json({ message: "Server error, try again later" }, 404);
  }
}

export async function getResturant(c) {
  const id = c.req.param("id") as number;
  const singleRest = await fetchOneRest(id);
  try {
    if (singleRest.length === 0) {
      return c.json({ message: "The restaurant is not registered" }, 404);
    }
    return c.json(singleRest);
  } catch (error) {
    return c.json({ message: "Server error. Try again later" }, 404);
  }
  return c.json(singleRest);
}

export async function postResturant(c) {
  const restaDetail = await c.req.json();

  const addingRestaurant = await addRest(restaDetail);
  if (addingRestaurant === "cannot insert") {
    return c.json(
      {
        Error:
          "You cannot insert restaurant without creating an account. Add user first",
      },
      404
    );
  }

  return c.json(
    { message: "restaurant created succesfull", content: addingRestaurant },
    200
  );
}

export async function updateResturant(c) {
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
    return c.json(
      { message: "The restaurant does not exist. Create it first" },
      404
    );
  }
  return c.json(update);
}
export async function removeResturant(c) {
  const id = c.req.param("id") as number;
  const toBeDeleted = await deleteRest(id);
  try {
    if (toBeDeleted.rowCount === 0) {
      return c.json({ message: "Restaurant does not exist" }, 404);
    } else {
      return c.json({ message: "Restaurant is deleted succesfully" });
    }
  } catch (error) {
    return c.json({ error: "Server error, try again later" }, 404);
  }
}
