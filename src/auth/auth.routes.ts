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
    if (!result.success) {
      const postError = result.error.issues[0];
      const { path, message, expected } = postError;
      if (message === "Required") {
        return c.json({ Error: `Field of ${path[0]} is missing` }, 404);
      } else {
        return c.json(
          {
            Error: `Field of ${path[0]} only allow data of type ${expected}`,
          },
          404
        );
      }
    }
  }),
  registerUser
);

authRoute.post("/login",loginUser);
