"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResOwner = exports.serveOwnerUpdate = exports.serveOwner = exports.fetchOneOwner = exports.serveAllOwner = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
async function serveAllOwner() {
    return await db_1.default.query.restaurant_owner.findMany({
        with: {
            users: true,
            restaurant: true,
        },
    });
}
exports.serveAllOwner = serveAllOwner;
async function fetchOneOwner(id) {
    return await db_1.default.query.restaurant_owner.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.restaurant_owner.id, id),
        with: {
            users: true,
            restaurant: true,
        },
    });
}
exports.fetchOneOwner = fetchOneOwner;
async function serveOwner(orderStatus) {
    return await db_1.default.insert(schema_1.restaurant_owner).values(orderStatus);
}
exports.serveOwner = serveOwner;
async function serveOwnerUpdate(id, updates) {
    return await db_1.default
        .update(schema_1.restaurant_owner)
        .set(updates)
        .where((0, drizzle_orm_1.eq)(schema_1.restaurant_owner.id, id));
}
exports.serveOwnerUpdate = serveOwnerUpdate;
async function deleteResOwner(id) {
    return await db_1.default.delete(schema_1.restaurant_owner).where((0, drizzle_orm_1.eq)(schema_1.restaurant_owner.id, id));
}
exports.deleteResOwner = deleteResOwner;
