import { Hono } from "hono";
import { registerUser, loginUser } from "./auth.controller";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const newUserinputs = z.object({
  username: z.string(),
  role: z.string(),
  password: z.string(),
});

export const authRoute = new Hono();

authRoute.post(
  "/register",
  zValidator("json", newUserinputs, (result, c) => {
    if (result.success) {
      return c.json({ message: "Succesfully added" });
    } else {
      return c.json({ message: "Confirm your data types" });
    }
  }),
  registerUser
);

authRoute.post("/login", loginUser);
