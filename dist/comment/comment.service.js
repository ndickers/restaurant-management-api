"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.serveCommentUpdate = exports.serveComment = exports.fetchOneComment = exports.serveAllComment = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
async function serveAllComment() {
    return await db_1.default.query.comment.findMany({
        with: {
            orders: true,
            users: true,
        },
    });
}
exports.serveAllComment = serveAllComment;
async function fetchOneComment(id) {
    return await db_1.default.query.comment.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.comment.id, id),
        with: {
            orders: true,
            users: true,
        },
    });
}
exports.fetchOneComment = fetchOneComment;
async function serveComment(orderStatus) {
    return await db_1.default.insert(schema_1.comment).values(orderStatus);
}
exports.serveComment = serveComment;
async function serveCommentUpdate(id, updates) {
    return await db_1.default.update(schema_1.comment).set(updates).where((0, drizzle_orm_1.eq)(schema_1.comment.id, id));
}
exports.serveCommentUpdate = serveCommentUpdate;
async function deleteComment(id) {
    return await db_1.default.delete(schema_1.comment).where((0, drizzle_orm_1.eq)(schema_1.comment.id, id));
}
exports.deleteComment = deleteComment;
