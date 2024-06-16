"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.registerNewUser = exports.confirmUserName = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
async function confirmUserName(uName) {
    const checkUsername = await db_1.default.query.auth.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.auth.username, uName.username),
    });
    return checkUsername;
}
exports.confirmUserName = confirmUserName;
async function registerNewUser(user) {
    await db_1.default.insert(schema_1.auth).values(user);
}
exports.registerNewUser = registerNewUser;
async function userLogin(user) {
    const getUser = await db_1.default.query.auth.findMany({
        with: { user: true },
        where: (0, drizzle_orm_1.eq)(schema_1.auth.username, user.username),
    });
    return getUser;
}
exports.userLogin = userLogin;
