import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import {
  getAllOrderMenu,
  addOrderMenu,
  getOneOrderMenu,
  updateOrderMenu,
  removeOrderMenu,
} from "./order_menu.controller.ts";
export const orderMenuRoute = new Hono();

const inputOrderMenu = z.object({
  order_id: z.number(),
  menu_item_id: z.number(),
  quantity: z.number(),
  item_price: z.number(),
  price: z.number(),
  comment: z.string(),
});
orderMenuRoute.delete("/order-menu/:id", removeOrderMenu);
orderMenuRoute.get("/order-menu", getAllOrderMenu);
orderMenuRoute.get("/order-menu/:id", getOneOrderMenu);
orderMenuRoute.patch("/order-menu/:id", updateOrderMenu);
orderMenuRoute.post(
  "/order-menu",
  zValidator("json", inputOrderMenu, (result, c) => {
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
  addOrderMenu
);
