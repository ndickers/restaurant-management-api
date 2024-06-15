import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { getAllMenuItem, addMenuItem, getOneMenuItem, updateMenuItem, removeMenuItem, } from "./menu_item.controller";
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
    if (result.success) {
        return c.json({ message: "Succesfully added" });
    }
    else {
        return c.json({ message: "Confirm your data types" });
    }
}), authorizeAll, addMenuItem);
