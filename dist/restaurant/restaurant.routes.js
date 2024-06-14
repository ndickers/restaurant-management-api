import { Hono } from "hono";
import { getAllRestaurant, getResturant, postResturant, updateResturant, removeResturant, } from "./restaurant.controller";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { adminAuth, authorizeAll } from "../middleware/authorize";
export const restaurantRoute = new Hono();
const inputRestaurant = z.object({
    name: z.string(),
    street_address: z.string(),
    zip_code: z.string(),
    city_id: z.number(),
});
restaurantRoute.get("/restaurant", adminAuth, getAllRestaurant);
restaurantRoute.get("/restaurant/:id", authorizeAll, getResturant);
restaurantRoute.post("/restaurant", zValidator("json", inputRestaurant, (result, c) => {
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
}), authorizeAll, postResturant);
restaurantRoute.patch("/restaurant/update/:id", authorizeAll, updateResturant);
restaurantRoute.delete("/restaurant/remove/:id", authorizeAll, removeResturant);
