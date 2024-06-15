"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
// @ts-ignore
const hono_1 = require("hono");
const category_controller_1 = require("./category.controller");
const authorize_1 = require("../middleware/authorize");
const zod_validator_1 = require("@hono/zod-validator");
const zod_1 = require("zod");
exports.categoryRoutes = new hono_1.Hono();
const inputCategory = zod_1.z.object({
    name: zod_1.z.string(),
});
exports.categoryRoutes.get("/category", authorize_1.adminAuth, category_controller_1.getAllCategory);
exports.categoryRoutes.get("/category/:id", authorize_1.authorizeAll, category_controller_1.getOneCategory);
exports.categoryRoutes.post("/category", (0, zod_validator_1.zValidator)("json", inputCategory, (result, c) => {
    if (result.success) {
        return c.json({ message: "Succesfully added" });
    }
    else {
        return c.json({ message: "Confirm your data types" });
    }
}), authorize_1.authorizeAll, category_controller_1.addCategory);
exports.categoryRoutes.patch("/category/:id", authorize_1.authorizeAll, category_controller_1.updateCategory);
exports.categoryRoutes.delete("/category/:id", authorize_1.authorizeAll, category_controller_1.removeCategory);
