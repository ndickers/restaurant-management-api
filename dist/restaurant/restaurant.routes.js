"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantRoute = void 0;
const hono_1 = require("hono");
const restaurant_controller_1 = require("./restaurant.controller");
const zod_validator_1 = require("@hono/zod-validator");
const zod_1 = require("zod");
const authorize_1 = require("../middleware/authorize");
exports.restaurantRoute = new hono_1.Hono();
const inputRestaurant = zod_1.z.object({
    name: zod_1.z.string(),
    street_address: zod_1.z.string(),
    zip_code: zod_1.z.string(),
    city_id: zod_1.z.number(),
});
exports.restaurantRoute.get("/restaurant", authorize_1.adminAuth, restaurant_controller_1.getAllRestaurant);
exports.restaurantRoute.get("/restaurant/:id", authorize_1.authorizeAll, restaurant_controller_1.getResturant);
exports.restaurantRoute.post("/restaurant", (0, zod_validator_1.zValidator)("json", inputRestaurant, (result, c) => {
    if (result.success) {
        return c.json({ message: "Succesfully added" });
    }
    else {
        return c.json({ message: "Confirm your data types" });
    }
}), authorize_1.authorizeAll, restaurant_controller_1.postResturant);
exports.restaurantRoute.patch("/restaurant/update/:id", authorize_1.authorizeAll, restaurant_controller_1.updateResturant);
exports.restaurantRoute.delete("/restaurant/remove/:id", authorize_1.authorizeAll, restaurant_controller_1.removeResturant);
