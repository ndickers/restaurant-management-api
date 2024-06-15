"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDriver = exports.fetchOneDriver = exports.serveUpdate = exports.addDriver = exports.serverAllDriver = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
async function serverAllDriver() {
    return await db_1.default.query.driver.findMany({
        with: {
            users: true,
            orders: true,
        },
    });
}
exports.serverAllDriver = serverAllDriver;
async function addDriver(driverDetail) {
    return await db_1.default.insert(schema_1.driver).values(driverDetail);
}
exports.addDriver = addDriver;
async function serveUpdate(id, driverUpdates) {
    return await db_1.default.update(schema_1.driver).set(driverUpdates).where((0, drizzle_orm_1.eq)(schema_1.driver.id, id));
}
exports.serveUpdate = serveUpdate;
async function fetchOneDriver(id) {
    return await db_1.default.query.driver.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.driver.id, id),
        with: {
            users: true,
            orders: true,
        },
    });
}
exports.fetchOneDriver = fetchOneDriver;
async function deleteDriver(id) {
    return await db_1.default.delete(schema_1.driver).where((0, drizzle_orm_1.eq)(schema_1.driver.id, id));
}
exports.deleteDriver = deleteDriver;
