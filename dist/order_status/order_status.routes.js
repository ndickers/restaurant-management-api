"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStatusRoute = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const zod_1 = require("zod");
const order_status_controller_1 = require("./order_status.controller");
const authorize_1 = require("../middleware/authorize");
exports.orderStatusRoute = new hono_1.Hono();
const inputOrderStatus = zod_1.z.object({
    order_id: zod_1.z.number(),
    status_catalog_id: zod_1.z.number(),
});
exports.orderStatusRoute.delete("/order-status/:id", authorize_1.authorizeAll, order_status_controller_1.deleteStatusOrder);
exports.orderStatusRoute.get("/order-status", authorize_1.adminAuth, order_status_controller_1.getAllOrderStatus);
exports.orderStatusRoute.get("/order-status/:id", authorize_1.authorizeAll, order_status_controller_1.getOneOrderStatus);
exports.orderStatusRoute.patch("/order/:id", authorize_1.authorizeAll, order_status_controller_1.updateOrderStatus);
exports.orderStatusRoute.post("/order-status", (0, zod_validator_1.zValidator)("json", inputOrderStatus, (result, c) => {
    if (result.success) {
        return c.json({ message: "Succesfully added" });
    }
    else {
        return c.json({ message: "Confirm your data types" });
    }
}), authorize_1.authorizeAll, order_status_controller_1.addOrderStatus);
