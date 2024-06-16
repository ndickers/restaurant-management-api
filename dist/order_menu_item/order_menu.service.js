"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderMenu = exports.serveOrderMenuUpdate = exports.serveOrderMenu = exports.fetchOneOrderMenu = exports.serveAllOrderMenu = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
async function serveAllOrderMenu() {
    return await db_1.default.query.order_menu_item.findMany({
        with: {
            orders: true,
            menu_item: true,
        },
    });
}
exports.serveAllOrderMenu = serveAllOrderMenu;
async function fetchOneOrderMenu(id) {
    return await db_1.default.query.order_menu_item.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.order_menu_item.id, id),
        with: {
            orders: true,
            menu_item: true,
        },
    });
}
exports.fetchOneOrderMenu = fetchOneOrderMenu;
async function serveOrderMenu(orderStatus) {
    return await db_1.default.insert(schema_1.order_menu_item).values(orderStatus);
}
exports.serveOrderMenu = serveOrderMenu;
async function serveOrderMenuUpdate(id, updates) {
    return await db_1.default
        .update(schema_1.order_menu_item)
        .set(updates)
        .where((0, drizzle_orm_1.eq)(schema_1.order_menu_item.id, id))
        .returning({
        content: schema_1.order_menu_item,
    });
}
exports.serveOrderMenuUpdate = serveOrderMenuUpdate;
async function deleteOrderMenu(id) {
    return await db_1.default.delete(schema_1.order_menu_item).where((0, drizzle_orm_1.eq)(schema_1.order_menu_item.id, id));
}
exports.deleteOrderMenu = deleteOrderMenu;
