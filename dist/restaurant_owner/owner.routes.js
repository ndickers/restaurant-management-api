import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { getAllOwner, addOwner, getOneOwner, updateOwner, deleteOwner, } from "./owner.controller";
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
    if (result.success) {
        return c.json({ message: "Succesfully added" });
    }
    else {
        return c.json({ message: "Confirm your data types" });
    }
}), authorizeAll, addOwner);
