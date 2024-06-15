"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.serveCategoryUpdate = exports.serveCategory = exports.fetchOneCategory = exports.serveAllCategory = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
async function serveAllCategory() {
    return await db_1.default.query.category.findMany({
        with: {
            menu_item: true,
        },
    });
}
exports.serveAllCategory = serveAllCategory;
async function fetchOneCategory(id) {
    return await db_1.default.query.category.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.category.id, id),
        with: {
            menu_item: true,
        },
    });
}
exports.fetchOneCategory = fetchOneCategory;
async function serveCategory(newVal) {
    return await db_1.default.insert(schema_1.category).values(newVal);
}
exports.serveCategory = serveCategory;
async function serveCategoryUpdate(id, updates) {
    return await db_1.default
        .update(schema_1.category)
        .set(updates)
        .where((0, drizzle_orm_1.eq)(schema_1.category.id, id))
        .returning({
        content: schema_1.category,
    });
}
exports.serveCategoryUpdate = serveCategoryUpdate;
async function deleteCategory(id) {
    return await db_1.default.delete(schema_1.category).where((0, drizzle_orm_1.eq)(schema_1.category.id, id));
}
exports.deleteCategory = deleteCategory;
