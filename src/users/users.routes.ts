import { Hono } from "hono";
import {
  getAllUsers,
  getOneUser,
  addNewUser,
  updateWholeUser,
  deleteUser,
} from "./users.controller";
import { adminAuth, userAuth, authorizeAll } from "../middleware/authorize";
import { appendTrailingSlash, trimTrailingSlash } from "hono/trailing-slash";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

export const userRoute = new Hono();
const inputUserData = z.object({
  name: z.string(),
  contact_phone: z.string(),
  phone_verified: z.boolean(),
  email: z.string().email({ message: "Invalid email" }),
  email_verified: z.boolean(),
  confirmation_code: z.string(),
  password: z.string(),
});

userRoute.use(trimTrailingSlash());

userRoute.get("/users", adminAuth, getAllUsers);

userRoute.get("/users/:id", authorizeAll, getOneUser);

userRoute.post(
  "/users",
  zValidator("json", inputUserData, (result, c) => {
    if (result.success) {
      return c.json({ message: "Succesfully added" });
    } else {
      return c.json({ message: "Confirm your data types" });
    }
  }),
  authorizeAll,
  addNewUser
);

userRoute.patch("/users/:id", authorizeAll, updateWholeUser);

userRoute.delete("/users/:id", authorizeAll, deleteUser);
