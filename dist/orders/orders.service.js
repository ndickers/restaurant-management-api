"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.serveOrderUpdate = exports.fetchOneOrder = exports.createOrder = exports.serverAllOrders = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
async function serverAllOrders() {
    return await db_1.default.query.orders.findMany({
        with: {
            user: true,
            driver: true,
            restaurant: true,
            order_status: true,
            order_menu_item: true,
        },
    });
}
exports.serverAllOrders = serverAllOrders;
async function createOrder(orderDetail) {
    return await db_1.default.insert(schema_1.orders).values(orderDetail);
}
exports.createOrder = createOrder;
async function fetchOneOrder(id) {
    return await db_1.default.query.orders.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.orders.id, id),
        with: {
            user: true,
            driver: true,
            restaurant: true,
            order_status: true,
            order_menu_item: true,
        },
    });
}
exports.fetchOneOrder = fetchOneOrder;
async function serveOrderUpdate(id, updates) {
    return await db_1.default
        .update(schema_1.orders)
        .set(updates)
        .where((0, drizzle_orm_1.eq)(schema_1.orders.id, id));
}
exports.serveOrderUpdate = serveOrderUpdate;
async function deleteOrder(id) {
    return await db_1.default.delete(schema_1.orders).where((0, drizzle_orm_1.eq)(schema_1.orders.id, id));
}
exports.deleteOrder = deleteOrder;
