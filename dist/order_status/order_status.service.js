"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderStatus = exports.serveOrderStatusUpdate = exports.serveOrderStatus = exports.fetchOneOrderStatus = exports.serveAllOrderStatus = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
async function serveAllOrderStatus() {
    return await db_1.default.query.order_status.findMany({
        with: {
            status_catalogue: true,
            orders: true,
        },
    });
}
exports.serveAllOrderStatus = serveAllOrderStatus;
async function fetchOneOrderStatus(id) {
    return await db_1.default.query.order_status.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.order_status.id, id),
        with: {
            status_catalogue: true,
            orders: true,
        },
    });
}
exports.fetchOneOrderStatus = fetchOneOrderStatus;
async function serveOrderStatus(orderStatus) {
    return await db_1.default.insert(schema_1.order_status).values(orderStatus);
}
exports.serveOrderStatus = serveOrderStatus;
async function serveOrderStatusUpdate(id, updates) {
    return await db_1.default
        .update(schema_1.order_status)
        .set(updates)
        .where((0, drizzle_orm_1.eq)(schema_1.order_status.id, id));
}
exports.serveOrderStatusUpdate = serveOrderStatusUpdate;
async function deleteOrderStatus(id) {
    return await db_1.default.delete(schema_1.order_status).where((0, drizzle_orm_1.eq)(schema_1.order_status.id, id));
}
exports.deleteOrderStatus = deleteOrderStatus;
