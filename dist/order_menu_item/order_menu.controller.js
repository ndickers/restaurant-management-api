"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOrderMenu = exports.updateOrderMenu = exports.addOrderMenu = exports.getOneOrderMenu = exports.getAllOrderMenu = void 0;
const order_menu_service_1 = require("./order_menu.service");
async function getAllOrderMenu(c) {
    const response = await (0, order_menu_service_1.serveAllOrderMenu)();
    try {
        if (response === null) {
            return c.json({ message: "No registered order menu item" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json(error, 404);
    }
}
exports.getAllOrderMenu = getAllOrderMenu;
async function getOneOrderMenu(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, order_menu_service_1.fetchOneOrderMenu)(id);
    try {
        if (response === null) {
            return c.json({ message: "Order menu is currently empty" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json(error);
    }
}
exports.getOneOrderMenu = getOneOrderMenu;
async function addOrderMenu(c) {
    const newOrderMenu = await c.req.json();
    const response = await (0, order_menu_service_1.serveOrderMenu)(newOrderMenu);
    try {
        if (response === null) {
            return c.json({ message: "Unable to add new order menu" }, 404);
        }
        else {
            return c.json({
                message: "Order menu added succesfully",
                content: response,
            });
        }
    }
    catch (error) {
        return c.json(error);
    }
}
exports.addOrderMenu = addOrderMenu;
async function updateOrderMenu(c) {
    const id = c.req.param("id");
    const updateContent = await c.req.json();
    const response = await (0, order_menu_service_1.serveOrderMenuUpdate)(id, updateContent);
    try {
        if (response === null) {
            return c.json({ message: "Order menu does not exist" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.updateOrderMenu = updateOrderMenu;
async function removeOrderMenu(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, order_menu_service_1.deleteOrderMenu)(id);
    try {
        if (response === null) {
            return c.json({ message: "Order menu item does not exist" }, 404);
        }
        else {
            return c.json({ message: "Order menu item is deleted succesfully" });
        }
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.removeOrderMenu = removeOrderMenu;
