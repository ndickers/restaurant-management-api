"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteService = exports.updateWhole = exports.addToService = exports.serveOneUser = exports.serveAllUsers = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
async function serveAllUsers() {
    return await db_1.default.query.users.findMany({
        with: {
            driver: true,
            restaurant_owner: true,
            orders: true,
            comment: true,
            address: true,
        },
    });
}
exports.serveAllUsers = serveAllUsers;
async function serveOneUser(id) {
    return await db_1.default.query.users.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.users.id, id),
        with: {
            driver: true,
            restaurant_owner: true,
            orders: true,
            comment: true,
            address: true,
        },
    });
}
exports.serveOneUser = serveOneUser;
async function addToService(user) {
    return await db_1.default.insert(schema_1.users).values(user);
}
exports.addToService = addToService;
async function updateWhole(id, user) {
    return await db_1.default.update(schema_1.users).set(user).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
}
exports.updateWhole = updateWhole;
async function deleteService(id) {
    return await db_1.default.delete(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
}
exports.deleteService = deleteService;
