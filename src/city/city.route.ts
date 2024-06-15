import { Hono } from "hono";

import {
  getOneCity,
  addCity,
  getAllCity,
  updateCity,
  removeCity,
} from "./city.controller";
import { adminAuth, authorizeAll } from "../middleware/authorize";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const cityRoutes = new Hono();

const inputCity = z.object({
  name: z.string(),
  code: z.number(),
  state_id: z.number(),
});

cityRoutes.get("/city", adminAuth, getAllCity);

cityRoutes.get("/city/:id", authorizeAll, getOneCity);
cityRoutes.post(
  "/city",
  zValidator("json", inputCity, (result, c) => {
    if (result.success) {
      return c.json({ message: "Succesfully added" });
    } else {
      return c.json({ message: "Confirm your data types" });
    }
  }),
  authorizeAll,
  addCity
);
cityRoutes.patch("/city/:id", authorizeAll, updateCity);
cityRoutes.delete("/city/:id", authorizeAll, removeCity);
