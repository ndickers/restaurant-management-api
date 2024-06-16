"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuItemRoute = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const zod_1 = require("zod");
const menu_item_controller_1 = require("./menu_item.controller");
const authorize_1 = require("../middleware/authorize");
exports.menuItemRoute = new hono_1.Hono();
const inputMenuItem = zod_1.z.object({
    name: zod_1.z.string(),
    restaurant_id: zod_1.z.number(),
    category_id: zod_1.z.number(),
    description: zod_1.z.string(),
    ingredients: zod_1.z.string(),
    price: zod_1.z.number(),
    active: zod_1.z.boolean(),
});
exports.menuItemRoute.delete("/menu-items/:id", authorize_1.authorizeAll, menu_item_controller_1.removeMenuItem);
exports.menuItemRoute.get("/menu-items", authorize_1.adminAuth, menu_item_controller_1.getAllMenuItem);
exports.menuItemRoute.get("/menu-items/:id", authorize_1.authorizeAll, menu_item_controller_1.getOneMenuItem);
exports.menuItemRoute.patch("/menu-items/:id", authorize_1.authorizeAll, menu_item_controller_1.updateMenuItem);
exports.menuItemRoute.post("/menu-item", (0, zod_validator_1.zValidator)("json", inputMenuItem, (result, c) => {
    if (result.success) {
        return c.json({ message: "Succesfully added" });
    }
    else {
        return c.json({ message: "Confirm your data types" });
    }
}), authorize_1.authorizeAll, menu_item_controller_1.addMenuItem);
