import { Hono } from "hono";

import {
  getOneOrder,
  addOrder,
  getAllOrders,
  updateOrder,
  removeOrder,
} from "./orders.controller";

import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { adminAuth, authorizeAll } from "../middleware/authorize";
export const ordersRoutes = new Hono();

const inputOrder = z.object({
  restaurant_id: z.number(),
  estimated_delivery_time: z.string(),
  actual_delivery_time: z.string(),
  delivery_address_id: z.number(),
  user_id: z.number(),
  driver_id: z.number(),
  price: z.number(),
  discount: z.number(),
  final_price: z.number(),
});

ordersRoutes.get("/orders", adminAuth, getAllOrders);

ordersRoutes.get("/orders/:id", authorizeAll, getOneOrder);
ordersRoutes.post(
  "/orders",
  zValidator("json", inputOrder, (result, c) => {
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
  addOrder
);
ordersRoutes.patch("/orders/:id", authorizeAll, updateOrder);
ordersRoutes.delete("/orders/:id", authorizeAll, removeOrder);
