"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRoutes = void 0;
const hono_1 = require("hono");
const address_controller_1 = require("./address.controller");
const authorize_1 = require("../middleware/authorize");
const zod_validator_1 = require("@hono/zod-validator");
const zod_1 = require("zod");
exports.addressRoutes = new hono_1.Hono();
const inputAddress = zod_1.z.object({
    street_address_1: zod_1.z.string(),
    street_address_2: zod_1.z.string(),
    zip_code: zod_1.z.string(),
    delivery_instructions: zod_1.z.string(),
    user_id: zod_1.z.number(),
    city_id: zod_1.z.number(),
});
exports.addressRoutes.get("/address", authorize_1.adminAuth, address_controller_1.getAllAddress);
exports.addressRoutes.get("/address/:id", authorize_1.authorizeAll, address_controller_1.getOneAddress);
exports.addressRoutes.post("/address", (0, zod_validator_1.zValidator)("json", inputAddress, (result, c) => {
    if (result.success) {
        return c.json({ message: "Succesfully added" });
    }
    else {
        return c.json({ message: "Confirm your data types" });
    }
}), authorize_1.authorizeAll, address_controller_1.createAddress);
exports.addressRoutes.patch("/address/:id", authorize_1.authorizeAll, address_controller_1.updateAddress);
exports.addressRoutes.delete("/address/:id", authorize_1.authorizeAll, address_controller_1.removeAddress);
