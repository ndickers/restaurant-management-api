"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const hono_1 = require("hono");
const auth_controller_1 = require("./auth.controller");
const zod_validator_1 = require("@hono/zod-validator");
const zod_1 = require("zod");
const newUserinputs = zod_1.z.object({
    username: zod_1.z.string(),
    role: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.authRoute = new hono_1.Hono();
exports.authRoute.post("/register", (0, zod_validator_1.zValidator)("json", newUserinputs, (result, c) => {
    if (result.success) {
        return c.json({ message: "Succesfully added" });
    }
    else {
        return c.json({ message: "Confirm your data types" });
    }
}), auth_controller_1.registerUser);
exports.authRoute.post("/login", auth_controller_1.loginUser);
