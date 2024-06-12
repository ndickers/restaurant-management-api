import { Hono } from "hono";

import {
  getOneCategory,
  addCategory,
  getAllCategory,
  updateCategory,
  removeCategory,
} from "./category.controller";

import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const categoryRoutes = new Hono();

const inputCategory = z.object({
  name: z.string(),
});

categoryRoutes.get("/category", getAllCategory);

categoryRoutes.get("/category/:id", getOneCategory);
categoryRoutes.post(
  "/category",
  zValidator("json", inputCategory, (result, c) => {
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
  addCategory
);
categoryRoutes.patch("/category/:id", updateCategory);
categoryRoutes.delete("/category/:id", removeCategory);
