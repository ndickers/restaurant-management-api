"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMenuItem = exports.updateMenuItem = exports.addMenuItem = exports.getOneMenuItem = exports.getAllMenuItem = void 0;
const menu_item_service_1 = require("./menu_item.service");
async function getAllMenuItem(c) {
    const response = await (0, menu_item_service_1.serveAllMenuItem)();
    try {
        if (response.length === 0) {
            return c.json({ message: "No registered menu item" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.getAllMenuItem = getAllMenuItem;
async function getOneMenuItem(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, menu_item_service_1.fetchOneMenuItem)(id);
    try {
        if (Object.keys(response).length === 0) {
            return c.json({ message: "The list menu does not exist" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.getOneMenuItem = getOneMenuItem;
async function addMenuItem(c) {
    const newItemMenu = await c.req.json();
    const response = await (0, menu_item_service_1.serveMenuItem)(newItemMenu);
    try {
        if (response) {
            return c.json({
                message: "Menu item added  succesfully",
                content: response,
            });
        }
        else {
            return c.json({ message: "List item was not successfully added" });
        }
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.addMenuItem = addMenuItem;
async function updateMenuItem(c) {
    const id = Number(c.req.param("id"));
    const updateContent = await c.req.json();
    const response = await (0, menu_item_service_1.serveMenuItemUpdate)(id, updateContent);
    try {
        if (Object.keys(response).length === 0) {
            return c.json({ message: "You cannot update non existsing menu item" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.updateMenuItem = updateMenuItem;
async function removeMenuItem(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, menu_item_service_1.deleteMenuItem)(id);
    try {
        if (Object.keys(response).length !== 0) {
            return c.json({ message: "Menu item does not exist" }, 404);
        }
        else {
            return c.json({ message: "Menu item is deleted succesfully" });
        }
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.removeMenuItem = removeMenuItem;
