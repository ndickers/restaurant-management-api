"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderMenuRoute = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const zod_1 = require("zod");
const order_menu_controller_1 = require("./order_menu.controller");
const authorize_1 = require("../middleware/authorize");
exports.orderMenuRoute = new hono_1.Hono();
const inputOrderMenu = zod_1.z.object({
    order_id: zod_1.z.number(),
    menu_item_id: zod_1.z.number(),
    quantity: zod_1.z.number(),
    item_price: zod_1.z.number(),
    price: zod_1.z.number(),
    comment: zod_1.z.string(),
});
exports.orderMenuRoute.delete("/order-menu/:id", authorize_1.authorizeAll, order_menu_controller_1.removeOrderMenu);
exports.orderMenuRoute.get("/order-menu", authorize_1.adminAuth, order_menu_controller_1.getAllOrderMenu);
exports.orderMenuRoute.get("/order-menu/:id", authorize_1.authorizeAll, order_menu_controller_1.getOneOrderMenu);
exports.orderMenuRoute.patch("/order-menu/:id", authorize_1.authorizeAll, order_menu_controller_1.updateOrderMenu);
exports.orderMenuRoute.post("/order-menu", (0, zod_validator_1.zValidator)("json", inputOrderMenu, (result, c) => {
    if (result.success) {
        return c.json({ message: "Succesfully added" });
    }
    else {
        return c.json({ message: "Confirm your data types" });
    }
}), authorize_1.authorizeAll, order_menu_controller_1.addOrderMenu);
