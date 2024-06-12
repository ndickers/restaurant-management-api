import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import { orderStatusRelations } from "../drizzle/schema";
import { ordersRoutes } from "../orders/orders.routes";

import {
  getAllOrderStatus,
  addOrderStatus,
  getOneOrderStatus,
  updateOrderStatus,
  deleteStatusOrder,
} from "./order_status.controller";
export const orderStatusRoute = new Hono();

const inputRestaurant = z.object({
  order_id: z.number(),
  status_catalog_id: z.number(),
});
orderStatusRoute.delete("/order-status/:id", deleteStatusOrder);
orderStatusRoute.get("/order-status", getAllOrderStatus);
orderStatusRoute.get("/order-status/:id", getOneOrderStatus);
orderStatusRoute.patch("/order/:id", updateOrderStatus);
orderStatusRoute.post(
  "/order_status",
  zValidator("json", inputRestaurant, (result, c) => {
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
  addOrderStatus
);
