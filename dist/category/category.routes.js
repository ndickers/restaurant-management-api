// @ts-ignore
import { Hono } from "hono";
import { getOneCategory, addCategory, getAllCategory, updateCategory, removeCategory, } from "./category.controller";
import { adminAuth, authorizeAll } from "../middleware/authorize";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
export const categoryRoutes = new Hono();
const inputCategory = z.object({
    name: z.string(),
});
categoryRoutes.get("/category", adminAuth, getAllCategory);
categoryRoutes.get("/category/:id", authorizeAll, getOneCategory);
categoryRoutes.post("/category", zValidator("json", inputCategory, (result, c) => {
    if (result.success) {
        return c.json({ message: "Succesfully added" });
    }
    else {
        return c.json({ message: "Confirm your data types" });
    }
}), authorizeAll, addCategory);
categoryRoutes.patch("/category/:id", authorizeAll, updateCategory);
categoryRoutes.delete("/category/:id", authorizeAll, removeCategory);
