import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { adminAuth, authorizeAll } from "../middleware/authorize";
import { getAllComment, addComment, getOneComment, updateComment, removeComment, } from "./comment.controller";
export const commentRoute = new Hono();
const inputComment = z.object({
    user_id: z.number(),
    order_id: z.number(),
    status_catalog_id: z.number(),
    comment_text: z.string(),
    is_complaint: z.boolean(),
    is_praise: z.boolean(),
    street_address_2: z.string(),
    zip_code: z.string(),
    delivery_instructions: z.string(),
});
commentRoute.delete("/comments/:id", adminAuth, removeComment);
commentRoute.get("/comments", authorizeAll, getAllComment);
commentRoute.get("/comments/:id", authorizeAll, getOneComment);
commentRoute.patch("/comments/:id", authorizeAll, updateComment);
commentRoute.post("/comments", zValidator("json", inputComment, (result, c) => {
    if (result.success) {
        return c.json({ message: "Succesfully added" });
    }
    else {
        return c.json({ message: "Confirm your data types" });
    }
}), authorizeAll, addComment);
