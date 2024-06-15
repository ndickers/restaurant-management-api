"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateWholeUser = exports.addNewUser = exports.getOneUser = exports.getAllUsers = void 0;
const users_service_1 = require("./users.service");
async function getAllUsers(c) {
    const response = await (0, users_service_1.serveAllUsers)();
    try {
        if (response === null) {
            return c.json({ message: "Users cannot be fetched" });
        }
        if (response.length === 0) {
            return c.json({ message: "There is no user currently" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.getAllUsers = getAllUsers;
async function getOneUser(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, users_service_1.serveOneUser)(id);
    try {
        if (response === null) {
            return c.json({ message: "The user does not exist" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.getOneUser = getOneUser;
async function addNewUser(c) {
    const newUser = await c.req.json();
    const response = await (0, users_service_1.addToService)(newUser);
    try {
        if (response === null) {
            return c.json({ message: "Unable to add the user" });
        }
        return c.json({ message: "created succesfully", content: response });
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.addNewUser = addNewUser;
async function updateWholeUser(c) {
    const id = Number(c.req.param("id"));
    const updateUser = await c.req.json();
    const response = await (0, users_service_1.updateWhole)(id, updateUser);
    try {
        if (response === null) {
            return c.json({
                error: "Unable to update the user",
            }, 404);
        }
        return c.json({ message: "User succesfully updated", content: response });
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.updateWholeUser = updateWholeUser;
async function deleteUser(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, users_service_1.deleteService)(id);
    try {
        if (response === null) {
            return c.json({ message: "Unable to delete the user" });
        }
        return c.json({ message: "Deleted succesful" });
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.deleteUser = deleteUser;
