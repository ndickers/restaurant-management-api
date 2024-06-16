"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddress = exports.serveAddressUpdate = exports.addAddress = exports.fetchOneAddress = exports.serveAllAddress = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
async function serveAllAddress() {
    return await db_1.default.query.address.findMany({
        with: {
            city: true,
            users: true,
            orders: true,
        },
    });
}
exports.serveAllAddress = serveAllAddress;
async function fetchOneAddress(id) {
    return await db_1.default.query.address.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.address.id, id),
        with: {
            city: true,
            users: true,
            orders: true,
        },
    });
}
exports.fetchOneAddress = fetchOneAddress;
async function addAddress(val) {
    return await db_1.default.insert(schema_1.address).values(val);
}
exports.addAddress = addAddress;
async function serveAddressUpdate(id, updates) {
    return await db_1.default.update(schema_1.address).set(updates).where((0, drizzle_orm_1.eq)(schema_1.address.id, id));
}
exports.serveAddressUpdate = serveAddressUpdate;
async function deleteAddress(id) {
    return await db_1.default.delete(schema_1.address).where((0, drizzle_orm_1.eq)(schema_1.address.id, id));
}
exports.deleteAddress = deleteAddress;
