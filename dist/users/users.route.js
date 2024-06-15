"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const hono_1 = require("hono");
const users_controller_1 = require("./users.controller");
const authorize_1 = require("../middleware/authorize");
const trailing_slash_1 = require("hono/trailing-slash");
const zod_1 = require("zod");
const zod_validator_1 = require("@hono/zod-validator");
exports.userRoute = new hono_1.Hono();
const inputUserData = zod_1.z.object({
    name: zod_1.z.string(),
    contact_phone: zod_1.z.string(),
    phone_verified: zod_1.z.boolean(),
    email: zod_1.z.string().email({ message: "Invalid email" }),
    email_verified: zod_1.z.boolean(),
    confirmation_code: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.userRoute.use((0, trailing_slash_1.trimTrailingSlash)());
exports.userRoute.get("/users", authorize_1.adminAuth, users_controller_1.getAllUsers);
exports.userRoute.get("/users/:id", authorize_1.authorizeAll, users_controller_1.getOneUser);
exports.userRoute.post("/users", (0, zod_validator_1.zValidator)("json", inputUserData, (result, c) => {
    if (result.success) {
        return c.json({ message: "Succesfully added" });
    }
    else {
        return c.json({ message: "Confirm your data types" });
    }
}), authorize_1.authorizeAll, users_controller_1.addNewUser);
exports.userRoute.patch("/users/:id", authorize_1.authorizeAll, users_controller_1.updateWholeUser);
exports.userRoute.delete("/users/:id", authorize_1.authorizeAll, users_controller_1.deleteUser);
