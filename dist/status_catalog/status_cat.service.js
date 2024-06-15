"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatusCatalog = exports.serveStatusCatalogUpdate = exports.serveStatusCatalog = exports.fetchOneStatusCatalog = exports.serveAllStatusCatalog = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
async function serveAllStatusCatalog() {
    return await db_1.default.query.status_catalog.findMany({
        with: {
            order_status: true,
        },
    });
}
exports.serveAllStatusCatalog = serveAllStatusCatalog;
async function fetchOneStatusCatalog(id) {
    return await db_1.default.query.status_catalog.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.status_catalog.id, id),
        with: {
            order_status: true,
        },
    });
}
exports.fetchOneStatusCatalog = fetchOneStatusCatalog;
async function serveStatusCatalog(orderStatus) {
    return await db_1.default.insert(schema_1.status_catalog).values(orderStatus);
}
exports.serveStatusCatalog = serveStatusCatalog;
async function serveStatusCatalogUpdate(id, updates) {
    return await db_1.default
        .update(schema_1.status_catalog)
        .set(updates)
        .where((0, drizzle_orm_1.eq)(schema_1.status_catalog.id, id));
}
exports.serveStatusCatalogUpdate = serveStatusCatalogUpdate;
async function deleteStatusCatalog(id) {
    return await db_1.default.delete(schema_1.status_catalog).where((0, drizzle_orm_1.eq)(schema_1.status_catalog.id, id));
}
exports.deleteStatusCatalog = deleteStatusCatalog;
