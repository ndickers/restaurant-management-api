import { Hono } from "hono";
import { getOneAddress, createAddress, getAllAddress, updateAddress, removeAddress, } from "./address.controller";
import { adminAuth, authorizeAll } from "../middleware/authorize";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
export const addressRoutes = new Hono();
const inputAddress = z.object({
    street_address_1: z.string(),
    street_address_2: z.string(),
    zip_code: z.string(),
    delivery_instructions: z.string(),
    user_id: z.number(),
    city_id: z.number(),
});
addressRoutes.get("/address", adminAuth, getAllAddress);
addressRoutes.get("/address/:id", authorizeAll, getOneAddress);
addressRoutes.post("/address", zValidator("json", inputAddress, (result, c) => {
    if (result.success) {
        return c.json({ message: "Succesfully added" });
    }
    else {
        return c.json({ message: "Confirm your data types" });
    }
}), authorizeAll, createAddress);
addressRoutes.patch("/address/:id", authorizeAll, updateAddress);
addressRoutes.delete("/address/:id", authorizeAll, removeAddress);
