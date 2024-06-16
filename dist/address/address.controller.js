"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAddress = exports.updateAddress = exports.createAddress = exports.getOneAddress = exports.getAllAddress = void 0;
const address_service_1 = require("./address.service");
async function getAllAddress(c) {
    const response = await (0, address_service_1.serveAllAddress)();
    try {
        if (response === null) {
            return c.json({ message: "No registered address" }, 404);
        }
        else {
            return c.json(response);
        }
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.getAllAddress = getAllAddress;
async function getOneAddress(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, address_service_1.fetchOneAddress)(id);
    try {
        if (response === null) {
            return c.json({ message: "Address not found. Add it first" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.getOneAddress = getOneAddress;
async function createAddress(c) {
    const newDetails = await c.req.json();
    const response = await (0, address_service_1.addAddress)(newDetails);
    try {
        if (response !== null) {
            return c.json(response);
        }
        else {
            return c.json({ message: "Unable to create address" });
        }
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.createAddress = createAddress;
async function updateAddress(c) {
    const id = Number(c.req.param("id"));
    const updateContent = await c.req.json();
    const response = await (0, address_service_1.serveAddressUpdate)(id, updateContent);
    try {
        if (response !== null) {
            return c.json({
                message: "Address updated successfully",
                content: response,
            });
        }
        else {
            return c.json({ error: "No address in the database" });
        }
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.updateAddress = updateAddress;
async function removeAddress(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, address_service_1.deleteAddress)(id);
    try {
        if (response) {
            return c.json({ message: "address deleted successfully" });
        }
        else {
            return c.json({ message: "Unable to delete address" });
        }
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.removeAddress = removeAddress;
