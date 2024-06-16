"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverRoute = void 0;
const hono_1 = require("hono");
const driver_controller_1 = require("./driver.controller");
const zod_validator_1 = require("@hono/zod-validator");
const zod_1 = require("zod");
const authorize_1 = require("../middleware/authorize");
exports.driverRoute = new hono_1.Hono();
const inputDriver = zod_1.z.object({
    car_make: zod_1.z.string(),
    car_model: zod_1.z.string(),
    car_year: zod_1.z.number(),
    user_id: zod_1.z.number(),
    online: zod_1.z.boolean(),
    delivering: zod_1.z.boolean(),
});
exports.driverRoute.get("/drivers", authorize_1.adminAuth, driver_controller_1.getDrivers);
exports.driverRoute.post("/drivers", (0, zod_validator_1.zValidator)("json", inputDriver, (result, c) => {
    if (result.success) {
        return c.json({ message: "Succesfully added" });
    }
    else {
        return c.json({ message: "Confirm your data types" });
    }
}), authorize_1.authorizeAll, driver_controller_1.postDriver);
exports.driverRoute.get("/drivers/:id", authorize_1.authorizeAll, driver_controller_1.getOneDriver);
exports.driverRoute.patch("/drivers/:id", authorize_1.authorizeAll, driver_controller_1.updateDriver);
exports.driverRoute.delete("/drivers/:id", authorize_1.authorizeAll, driver_controller_1.removeDriver);
