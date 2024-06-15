"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRoutes = void 0;
const hono_1 = require("hono");
const orders_controller_1 = require("./orders.controller");
const zod_validator_1 = require("@hono/zod-validator");
const zod_1 = require("zod");
const authorize_1 = require("../middleware/authorize");
exports.ordersRoutes = new hono_1.Hono();
const inputOrder = zod_1.z.object({
    restaurant_id: zod_1.z.number(),
    estimated_delivery_time: zod_1.z.string(),
    actual_delivery_time: zod_1.z.string(),
    delivery_address_id: zod_1.z.number(),
    user_id: zod_1.z.number(),
    driver_id: zod_1.z.number(),
    price: zod_1.z.number(),
    discount: zod_1.z.number(),
    final_price: zod_1.z.number(),
});
exports.ordersRoutes.get("/orders", authorize_1.adminAuth, orders_controller_1.getAllOrders);
exports.ordersRoutes.get("/orders/:id", authorize_1.authorizeAll, orders_controller_1.getOneOrder);
exports.ordersRoutes.post("/orders", (0, zod_validator_1.zValidator)("json", inputOrder, (result, c) => {
    if (result.success) {
        return c.json({ message: "Succesfully added" });
    }
    else {
        return c.json({ message: "Confirm your data types" });
    }
}), authorize_1.authorizeAll, orders_controller_1.addOrder);
exports.ordersRoutes.patch("/orders/:id", authorize_1.authorizeAll, orders_controller_1.updateOrder);
exports.ordersRoutes.delete("/orders/:id", authorize_1.authorizeAll, orders_controller_1.removeOrder);
