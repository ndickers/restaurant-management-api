"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ownersRoutes = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const zod_1 = require("zod");
const owner_controller_1 = require("./owner.controller");
const authorize_1 = require("../middleware/authorize");
exports.ownersRoutes = new hono_1.Hono();
const ownerDetails = zod_1.z.object({
    restaurant_id: zod_1.z.number(),
    owner_id: zod_1.z.number(),
});
exports.ownersRoutes.delete("/owners/:id", authorize_1.authorizeAll, owner_controller_1.deleteOwner);
exports.ownersRoutes.get("/owners", authorize_1.adminAuth, owner_controller_1.getAllOwner);
exports.ownersRoutes.get("/owners/:id", authorize_1.authorizeAll, owner_controller_1.getOneOwner);
exports.ownersRoutes.patch("/owners/:id", authorize_1.authorizeAll, owner_controller_1.updateOwner);
exports.ownersRoutes.post("/owners", (0, zod_validator_1.zValidator)("json", ownerDetails, (result, c) => {
    if (result.success) {
        return c.json({ message: "Succesfully added" });
    }
    else {
        return c.json({ message: "Confirm your data types" });
    }
}), authorize_1.authorizeAll, owner_controller_1.addOwner);
