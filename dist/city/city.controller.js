"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCity = exports.updateCity = exports.addCity = exports.getOneCity = exports.getAllCity = void 0;
const city_service_1 = require("./city.service");
async function getAllCity(c) {
    const response = await (0, city_service_1.serveAllCity)();
    try {
        if (response === null) {
            return c.json({ message: "No registered category" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json(error, 404);
    }
}
exports.getAllCity = getAllCity;
async function getOneCity(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, city_service_1.fetchOneCity)(id);
    try {
        if (response === null) {
            return c.json({ message: "No registered city" }, 404);
        }
        else {
            return c.json(response);
        }
    }
    catch (error) {
        return c.json(error);
    }
}
exports.getOneCity = getOneCity;
async function addCity(c) {
    const newDetails = await c.req.json();
    const response = await (0, city_service_1.serveCity)(newDetails);
    try {
        if (response === null) {
            return c.json({ message: "You  cannot update non existing city" });
        }
        else {
            return c.json(response);
        }
    }
    catch (error) {
        return c.json(error);
    }
}
exports.addCity = addCity;
async function updateCity(c) {
    const id = Number(c.req.param("id"));
    const updateContent = await c.req.json();
    const response = await (0, city_service_1.serveCityUpdate)(id, updateContent);
    try {
        if (response === null) {
            return c.json({ message: "The city does not exist. Create it first" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json(error, 404);
    }
}
exports.updateCity = updateCity;
async function removeCity(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, city_service_1.deleteCity)(id);
    try {
        if (response === null) {
            return c.json({ message: "Category deleted successfully" });
        }
        else {
            return c.json({ message: "You cannot delete non existing category" });
        }
    }
    catch (error) {
        return c.json(error, 404);
    }
}
exports.removeCity = removeCity;
