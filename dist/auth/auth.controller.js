"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
require("dotenv/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_service_1 = require("./auth.service");
async function registerUser(c) {
    const newUser = await c.req.json();
    const isUserExist = await (0, auth_service_1.confirmUserName)(newUser.username);
    //   check if username exist before registering
    if (isUserExist.length === 0) {
        const hashedPass = await bcrypt_1.default.hash(newUser.password, 8);
        newUser.password = hashedPass;
        (0, auth_service_1.registerNewUser)(newUser);
        return c.json({ message: "User succesfully created" });
    }
    return c.json({ message: "The username already exist" }, 403);
}
exports.registerUser = registerUser;
async function loginUser(c) {
    const userCredentials = await c.req.json();
    const user = await (0, auth_service_1.userLogin)(userCredentials);
    if (user === null) {
        return c.json({ message: "User does not exist" }, 403);
    }
    // const { password }: string | null = user;
    const checkPassMatch = await bcrypt_1.default.compare(userCredentials.password, user[0].password);
    if (!checkPassMatch) {
        return c.json({ message: "Incorrect password" });
    }
    //   create token if pass is correct
    const { username, role } = user[0];
    console.log(username, role);
    const token = jsonwebtoken_1.default.sign({ username, role }, process.env.SECRET);
    return c.json({ token });
}
exports.loginUser = loginUser;
