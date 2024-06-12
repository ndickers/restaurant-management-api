import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import {
  getAllOwner,
  addOwner,
  getOneOwner,
  updateOwner,
  deleteOwner,
} from "./order_status.controller";
export const ownersRoutes = new Hono();

const ownerDetails = z.object({
  restaurant_id: z.number(),
  owner_id: z.number(),
});
ownersRoutes.delete("/owner/:id", deleteOwner);
ownersRoutes.get("/owner", getAllOwner);
ownersRoutes.get("/owner/:id", getOneOwner);
ownersRoutes.patch("/owner/:id", updateOwner);
ownersRoutes.post(
  "/order_status",
  zValidator("json", ownerDetails, (result, c) => {
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
  addOwner
);
