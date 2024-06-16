"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusCatalogRoute = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const zod_1 = require("zod");
const status_cat_controller_1 = require("./status_cat.controller");
const authorize_1 = require("../middleware/authorize");
exports.statusCatalogRoute = new hono_1.Hono();
const inputStatusCatalog = zod_1.z.object({
    name: zod_1.z.string(),
});
exports.statusCatalogRoute.delete("/status-catalog/:id", authorize_1.authorizeAll, status_cat_controller_1.deleteCatalogStatus);
exports.statusCatalogRoute.get("/status-catalog", authorize_1.adminAuth, status_cat_controller_1.getAllStatusCatalog);
exports.statusCatalogRoute.get("/status-catalog/:id", authorize_1.authorizeAll, status_cat_controller_1.getOneStatusCatalog);
exports.statusCatalogRoute.patch("/status-catalog/:id", authorize_1.authorizeAll, status_cat_controller_1.updateStatusCatalog);
exports.statusCatalogRoute.post("/status-catalog", (0, zod_validator_1.zValidator)("json", inputStatusCatalog, (result, c) => {
    if (result.success) {
        return c.json({ message: "Succesfully added" });
    }
    else {
        return c.json({ message: "Confirm your data types" });
    }
}), authorize_1.authorizeAll, status_cat_controller_1.addStatusCatalog);
