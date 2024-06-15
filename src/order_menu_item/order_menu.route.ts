import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import {
  getAllOrderMenu,
  addOrderMenu,
  getOneOrderMenu,
  updateOrderMenu,
  removeOrderMenu,
} from "./order_menu.controller";
import { adminAuth, authorizeAll } from "../middleware/authorize";
export const orderMenuRoute = new Hono();

const inputOrderMenu = z.object({
  order_id: z.number(),
  menu_item_id: z.number(),
  quantity: z.number(),
  item_price: z.number(),
  price: z.number(),
  comment: z.string(),
});
orderMenuRoute.delete("/order-menu/:id", authorizeAll, removeOrderMenu);
orderMenuRoute.get("/order-menu", adminAuth, getAllOrderMenu);
orderMenuRoute.get("/order-menu/:id", authorizeAll, getOneOrderMenu);
orderMenuRoute.patch("/order-menu/:id", authorizeAll, updateOrderMenu);
orderMenuRoute.post(
  "/order-menu",
  zValidator("json", inputOrderMenu, (result, c) => {
    if (result.success) {
      return c.json({ message: "Succesfully added" });
    } else {
      return c.json({ message: "Confirm your data types" });
    }
  }),
  authorizeAll,
  addOrderMenu
);
