import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { getAllOwner, addOwner, getOneOwner, updateOwner, deleteOwner, } from "./owner.controller.ts";
import { adminAuth, authorizeAll } from "../middleware/authorize";
export const ownersRoutes = new Hono();
const ownerDetails = z.object({
    restaurant_id: z.number(),
    owner_id: z.number(),
});
ownersRoutes.delete("/owners/:id", authorizeAll, deleteOwner);
ownersRoutes.get("/owners", adminAuth, getAllOwner);
ownersRoutes.get("/owners/:id", authorizeAll, getOneOwner);
ownersRoutes.patch("/owners/:id", authorizeAll, updateOwner);
ownersRoutes.post("/owners", zValidator("json", ownerDetails, (result, c) => {
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
}), authorizeAll, addOwner);
