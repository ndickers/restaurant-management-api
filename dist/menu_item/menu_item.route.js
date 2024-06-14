import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { getAllMenuItem, addMenuItem, getOneMenuItem, updateMenuItem, removeMenuItem, } from "./menu_item.controller.ts";
import { adminAuth, authorizeAll } from "../middleware/authorize";
export const menuItemRoute = new Hono();
const inputMenuItem = z.object({
    name: z.string(),
    restaurant_id: z.number(),
    category_id: z.number(),
    description: z.string(),
    ingredients: z.string(),
    price: z.number(),
    active: z.boolean(),
});
menuItemRoute.delete("/menu-items/:id", authorizeAll, removeMenuItem);
menuItemRoute.get("/menu-items", adminAuth, getAllMenuItem);
menuItemRoute.get("/menu-items/:id", authorizeAll, getOneMenuItem);
menuItemRoute.patch("/menu-items/:id", authorizeAll, updateMenuItem);
menuItemRoute.post("/menu-item", zValidator("json", inputMenuItem, (result, c) => {
    if (!result.success) {
        const postError = result.error.issues[0];
        const { path, message, expected } = postError;
        if (message === "Required") {
            return c.json({ Error: `Field of ${path[0]} is missing` }, 404);
        }
        else {
            return c.json({
                Error: `Field of ${path[0]} only allow data of type ${expected}`,
            }, 404);
        }
    }
}), authorizeAll, addMenuItem);
