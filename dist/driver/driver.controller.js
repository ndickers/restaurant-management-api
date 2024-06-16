"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDriver = exports.updateDriver = exports.postDriver = exports.getOneDriver = exports.getDrivers = void 0;
const driver_service_1 = require("./driver.service");
async function getDrivers(c) {
    const response = await (0, driver_service_1.serverAllDriver)();
    try {
        if (response.length === 0) {
            return c.json({ message: "Currently there is no registered driver" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json(response, 404);
    }
}
exports.getDrivers = getDrivers;
async function getOneDriver(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, driver_service_1.fetchOneDriver)(id);
    try {
        if (Object.keys(response).length === 0) {
            return c.json({ message: "The driver is not registered" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.getOneDriver = getOneDriver;
async function postDriver(c) {
    const driver = await c.req.json();
    const response = await (0, driver_service_1.addDriver)(driver);
    try {
        if (Object.keys(response).length === 0) {
            return c.json({ message: "Driver was unable to be added" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.postDriver = postDriver;
async function updateDriver(c) {
    const id = Number(c.req.param("id"));
    const updateContent = await c.req.json();
    const response = await (0, driver_service_1.serveUpdate)(id, updateContent);
    try {
        if (Object.keys(response).length === 0) {
            return c.json({ message: "You cannot update non existing driver" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.updateDriver = updateDriver;
async function removeDriver(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, driver_service_1.deleteDriver)(id);
    try {
        if (Object.keys(response).length !== 0) {
            return c.json({ message: "Driver deleted successfully" });
        }
        else {
            return c.json({
                message: "You are trying to delete non existing driver",
            });
        }
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.removeDriver = removeDriver;
