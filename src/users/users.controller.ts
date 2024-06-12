import {
  serveAllUsers,
  serveOneUser,
  addToService,
  updateWhole,
  deleteService,
} from "./users.service";

export async function getAllUsers(c) {
  const users = await serveAllUsers();
  if (users === null) {
    return c.error("Users cannot be fetched");
  }
  return c.json(users);
}

export async function getOneUser(c) {
  const id = c.req.param("id") as number;
  const user = await serveOneUser(id);
  if (user) {
    return c.json(user);
  } else {
    return c.text("User cannot be found");
  }
}

export async function addNewUser(c) {
  const newUser = await c.req.json();
  try {
    await addToService(newUser);
    return c.json("created succesfully");
  } catch (error) {
    return c.json({ Err: "The is unable to be created" });
  }
}

export async function updateWholeUser(c) {
  const id = (await c.req.param("id")) as number;
  const updateUser = await c.req.json();
  try {
    await updateWhole(id, updateUser);
    return c.text("Updated user");
  } catch (error) {
    return c.text("Unable to update user");
  }
}

export async function deleteUser(c) {
  const id = (await c.req.param("id")) as number;

  try {
    deleteService(id);
    return c.text("Deleted succesful");
  } catch (error) {
    return c.json({ Err: "Unable to delete" });
  }
}
