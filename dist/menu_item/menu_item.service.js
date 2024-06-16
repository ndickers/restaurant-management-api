"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItem = exports.serveMenuItemUpdate = exports.serveMenuItem = exports.fetchOneMenuItem = exports.serveAllMenuItem = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
async function serveAllMenuItem() {
    return await db_1.default.query.menu_item.findMany();
}
exports.serveAllMenuItem = serveAllMenuItem;
async function fetchOneMenuItem(id) {
    return await db_1.default.query.menu_item.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.menu_item.id, id),
    });
}
exports.fetchOneMenuItem = fetchOneMenuItem;
async function serveMenuItem(details) {
    return await db_1.default.insert(schema_1.menu_item).values(details);
}
exports.serveMenuItem = serveMenuItem;
async function serveMenuItemUpdate(id, updates) {
    return await db_1.default.update(schema_1.menu_item).set(updates).where((0, drizzle_orm_1.eq)(schema_1.menu_item.id, id));
}
exports.serveMenuItemUpdate = serveMenuItemUpdate;
async function deleteMenuItem(id) {
    return await db_1.default.delete(schema_1.menu_item).where((0, drizzle_orm_1.eq)(schema_1.menu_item.id, id));
}
exports.deleteMenuItem = deleteMenuItem;
