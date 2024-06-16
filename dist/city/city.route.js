"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cityRoutes = void 0;
const hono_1 = require("hono");
const city_controller_1 = require("./city.controller");
const authorize_1 = require("../middleware/authorize");
const zod_validator_1 = require("@hono/zod-validator");
const zod_1 = require("zod");
exports.cityRoutes = new hono_1.Hono();
const inputCity = zod_1.z.object({
    name: zod_1.z.string(),
    code: zod_1.z.number(),
    state_id: zod_1.z.number(),
});
exports.cityRoutes.get("/city", authorize_1.adminAuth, city_controller_1.getAllCity);
exports.cityRoutes.get("/city/:id", authorize_1.authorizeAll, city_controller_1.getOneCity);
exports.cityRoutes.post("/city", (0, zod_validator_1.zValidator)("json", inputCity, (result, c) => {
    if (result.success) {
        return c.json({ message: "Succesfully added" });
    }
    else {
        return c.json({ message: "Confirm your data types" });
    }
}), authorize_1.authorizeAll, city_controller_1.addCity);
exports.cityRoutes.patch("/city/:id", authorize_1.authorizeAll, city_controller_1.updateCity);
exports.cityRoutes.delete("/city/:id", authorize_1.authorizeAll, city_controller_1.removeCity);
