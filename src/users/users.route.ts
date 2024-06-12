import { Hono } from "hono";
import {
  getAllUsers,
  getOneUser,
  addNewUser,
  updateWholeUser,
  deleteUser,
} from "./users.controller";
import { adminAuth, userAuth } from "../middleware/authorize";
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

userRoute.get("/users/:id", userAuth, getOneUser);

userRoute.post(
  "/users/add",
  zValidator("json", inputUserData, (result, c) => {
    console.log();
    if (!result.success) {
      const field = result.error.issues[0];
      const expectedFieldType = field.expected;
      const missingField = field.path[0];

      const message = result.error.issues[0].message;
      if (message === "Required") {
        return c.json({ Error: `${missingField} field is missing` });
      } else {
        return c.json({
          Error: `${missingField} only takes type ${expectedFieldType}`,
        });
      }
    }
  }),
  addNewUser
);

userRoute.put("/users/update/:id", updateWholeUser);

userRoute.delete("/users/delete/:id", deleteUser);
