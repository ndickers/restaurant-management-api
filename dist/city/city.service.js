"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCity = exports.serveCityUpdate = exports.serveCity = exports.fetchOneCity = exports.serveAllCity = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
async function serveAllCity() {
    return await db_1.default.query.city.findMany({
        with: {
            restaurant: true,
            state: true,
            address: true,
        },
    });
}
exports.serveAllCity = serveAllCity;
async function fetchOneCity(id) {
    return await db_1.default.query.city.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.city.id, id),
    });
}
exports.fetchOneCity = fetchOneCity;
async function serveCity(orderStatus) {
    return await db_1.default.insert(schema_1.city).values(orderStatus);
}
exports.serveCity = serveCity;
async function serveCityUpdate(id, updates) {
    return await db_1.default.update(schema_1.city).set(updates).where((0, drizzle_orm_1.eq)(schema_1.city.id, id));
}
exports.serveCityUpdate = serveCityUpdate;
async function deleteCity(id) {
    return await db_1.default.delete(schema_1.city).where((0, drizzle_orm_1.eq)(schema_1.city.id, id));
}
exports.deleteCity = deleteCity;
