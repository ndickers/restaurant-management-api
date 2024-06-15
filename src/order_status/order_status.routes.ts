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
import { adminAuth, authorizeAll } from "../middleware/authorize";
export const orderStatusRoute = new Hono();

const inputOrderStatus = z.object({
  order_id: z.number(),
  status_catalog_id: z.number(),
});
orderStatusRoute.delete("/order-status/:id", authorizeAll, deleteStatusOrder);
orderStatusRoute.get("/order-status", adminAuth, getAllOrderStatus);
orderStatusRoute.get("/order-status/:id", authorizeAll, getOneOrderStatus);
orderStatusRoute.patch("/order/:id", authorizeAll, updateOrderStatus);
orderStatusRoute.post(
  "/order-status",
  zValidator("json", inputOrderStatus, (result, c) => {
    if (result.success) {
      return c.json({ message: "Succesfully added" });
    } else {
      return c.json({ message: "Confirm your data types" });
    }
  }),
  authorizeAll,
  addOrderStatus
);
