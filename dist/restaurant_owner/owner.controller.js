"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOwner = exports.updateOwner = exports.addOwner = exports.getOneOwner = exports.getAllOwner = void 0;
const owner_service_1 = require("./owner.service");
async function getAllOwner(c) {
    const response = await (0, owner_service_1.serveAllOwner)();
    try {
        if (response === null) {
            return c.json({
                message: "Currently there is no registered restaurant owner",
            });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.getAllOwner = getAllOwner;
async function getOneOwner(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, owner_service_1.fetchOneOwner)(id);
    try {
        if (Object.keys(response).length === 0) {
            return c.json({ message: "The owner does not exist" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.getOneOwner = getOneOwner;
async function addOwner(c) {
    const newOwner = await c.req.json();
    const response = await (0, owner_service_1.serveOwner)(newOwner);
    try {
        if (Object.keys(response).length === 0) {
            return c.json({ message: "Unable to create new owner" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.addOwner = addOwner;
async function updateOwner(c) {
    const id = Number(c.req.param("id"));
    const updateContent = await c.req.json();
    const response = await (0, owner_service_1.serveOwnerUpdate)(id, updateContent);
    try {
        if (response === null) {
            return c.json({ message: "Unable to update restaurant owner" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.updateOwner = updateOwner;
async function deleteOwner(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, owner_service_1.deleteResOwner)(id);
    try {
        if (Object.keys(response).length === 0) {
            return c.json({ message: "Restaurant owner does not exist" }, 404);
        }
        else {
            return c.json({ message: "Restaurant owner is deleted succesfully" });
        }
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.deleteOwner = deleteOwner;
