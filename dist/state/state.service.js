"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteState = exports.serveStateUpdate = exports.serveState = exports.fetchOneState = exports.serveAllState = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
async function serveAllState() {
    return await db_1.default.query.state.findMany({
        with: {
            city: true,
        },
    });
}
exports.serveAllState = serveAllState;
async function fetchOneState(id) {
    return await db_1.default.query.state.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.state.id, id),
        with: {
            city: true,
        },
    });
}
exports.fetchOneState = fetchOneState;
async function serveState(orderStatus) {
    return await db_1.default.insert(schema_1.state).values(orderStatus);
}
exports.serveState = serveState;
async function serveStateUpdate(id, updates) {
    return await db_1.default.update(schema_1.state).set(updates).where((0, drizzle_orm_1.eq)(schema_1.state.id, id));
}
exports.serveStateUpdate = serveStateUpdate;
async function deleteState(id) {
    return await db_1.default.delete(schema_1.state).where((0, drizzle_orm_1.eq)(schema_1.state.id, id));
}
exports.deleteState = deleteState;
