"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateRoutes = void 0;
const hono_1 = require("hono");
const state_controller_1 = require("./state.controller");
const zod_validator_1 = require("@hono/zod-validator");
const zod_1 = require("zod");
const authorize_1 = require("../middleware/authorize");
exports.stateRoutes = new hono_1.Hono();
const inputState = zod_1.z.object({
    name: zod_1.z.string(),
    code: zod_1.z.number(),
});
exports.stateRoutes.get("/states", authorize_1.adminAuth, state_controller_1.getAllState);
exports.stateRoutes.get("/states/:id", authorize_1.authorizeAll, state_controller_1.getOneState);
exports.stateRoutes.post("/states", (0, zod_validator_1.zValidator)("json", inputState, (result, c) => {
    if (result.success) {
        return c.json({ message: "Succesfully added" });
    }
    else {
        return c.json({ message: "Confirm your data types" });
    }
}), authorize_1.authorizeAll, state_controller_1.addState);
exports.stateRoutes.patch("/states/:id", authorize_1.authorizeAll, state_controller_1.updateState);
exports.stateRoutes.delete("/states/:id", authorize_1.authorizeAll, state_controller_1.removeState);
