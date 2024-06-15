import { Hono } from "hono";
import {
  getAllRestaurant,
  getResturant,
  postResturant,
  updateResturant,
  removeResturant,
} from "./restaurant.controller";
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

restaurantRoute.post(
  "/restaurant",
  zValidator("json", inputRestaurant, (result, c) => {
    if (result.success) {
      return c.json({ message: "Succesfully added" });
    } else {
      return c.json({ message: "Confirm your data types" });
    }
  }),
  authorizeAll,
  postResturant
);
restaurantRoute.patch("/restaurant/update/:id", authorizeAll, updateResturant);
restaurantRoute.delete("/restaurant/remove/:id", authorizeAll, removeResturant);
