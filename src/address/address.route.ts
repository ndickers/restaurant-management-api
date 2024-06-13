import { Hono } from "hono";

import {
  getOneAddress,
  createAddress,
  getAllAddress,
  updateAddress,
  removeAddress,
} from "./address.controller.ts";
import { adminAuth, userAuth, authorizeAll } from "../middleware/authorize";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const addressRoutes = new Hono();

const inputAddress = z.object({
  street_address_1: z.string(),
  street_address_2: z.string(),
  zip_code: z.string(),
  delivery_instructions: z.string(),
  user_id: z.number(),
  city_id: z.number(),
});

addressRoutes.get("/address", adminAuth, getAllAddress);

addressRoutes.get("/address/:id", authorizeAll, getOneAddress);
addressRoutes.post(
  "/address",
  zValidator("json", inputAddress, (result, c) => {
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
  authorizeAll,
  createAddress
);
addressRoutes.patch("/address/:id", authorizeAll, updateAddress);
addressRoutes.delete("/address/:id", authorizeAll, removeAddress);
