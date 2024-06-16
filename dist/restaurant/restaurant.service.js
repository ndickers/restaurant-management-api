"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRest = exports.serveUpdate = exports.addRest = exports.fetchOneRest = exports.serveAllRest = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
async function serveAllRest() {
    return await db_1.default.query.restaurant.findMany({
        with: {
            restaurant_owner: true,
            orders: true,
        },
    });
}
exports.serveAllRest = serveAllRest;
async function fetchOneRest(id) {
    return await db_1.default.query.restaurant.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.restaurant.id, id),
        with: {
            restaurant_owner: true,
            orders: true,
        },
    });
}
exports.fetchOneRest = fetchOneRest;
async function addRest(restDetail) {
    return await db_1.default.insert(schema_1.restaurant).values(restDetail);
}
exports.addRest = addRest;
async function serveUpdate(id, restUpdates) {
    return await db_1.default
        .update(schema_1.restaurant)
        .set(restUpdates)
        .where((0, drizzle_orm_1.eq)(schema_1.restaurant.id, id));
}
exports.serveUpdate = serveUpdate;
async function deleteRest(id) {
    return await db_1.default.delete(schema_1.restaurant).where((0, drizzle_orm_1.eq)(schema_1.restaurant.id, id));
}
exports.deleteRest = deleteRest;
