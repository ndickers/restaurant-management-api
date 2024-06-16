"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeResturant = exports.updateResturant = exports.postResturant = exports.getResturant = exports.getAllRestaurant = void 0;
const restaurant_service_1 = require("./restaurant.service");
async function getAllRestaurant(c) {
    const response = await (0, restaurant_service_1.serveAllRest)();
    try {
        if (response.length === 0) {
            return c.json({ message: "No registered Restaurant" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json(error, 404);
    }
}
exports.getAllRestaurant = getAllRestaurant;
async function getResturant(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, restaurant_service_1.fetchOneRest)(id);
    try {
        if (response === null) {
            return c.json({ message: "The restaurant is not registered" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json(error, 404);
    }
}
exports.getResturant = getResturant;
async function postResturant(c) {
    const restDetail = await c.req.json();
    const response = await (0, restaurant_service_1.addRest)(restDetail);
    try {
        if (response === null) {
            return c.json({
                error: "restaurant fail to create",
            }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json(error);
    }
}
exports.postResturant = postResturant;
async function updateResturant(c) {
    const id = Number(c.req.param("id"));
    const updateContent = await c.req.json();
    const response = await (0, restaurant_service_1.serveUpdate)(id, updateContent);
    try {
        if (response === null) {
            return c.json({ message: "The restaurant does not exist" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json(error);
    }
}
exports.updateResturant = updateResturant;
async function removeResturant(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, restaurant_service_1.deleteRest)(id);
    try {
        if (response === null) {
            return c.json({ message: "Restaurant does not exist" }, 404);
        }
        else {
            return c.json({ message: "Restaurant is deleted succesfully" });
        }
    }
    catch (error) {
        return c.json(error, 404);
    }
}
exports.removeResturant = removeResturant;
