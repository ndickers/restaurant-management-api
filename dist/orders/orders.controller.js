"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOrder = exports.updateOrder = exports.addOrder = exports.getOneOrder = exports.getAllOrders = void 0;
const orders_service_1 = require("./orders.service");
async function getAllOrders(c) {
    const response = await (0, orders_service_1.serverAllOrders)();
    try {
        if (response === null) {
            return c.json({ message: "Currently, there is no order" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.getAllOrders = getAllOrders;
async function getOneOrder(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, orders_service_1.fetchOneOrder)(id);
    try {
        if (response === null) {
            return c.json({ message: "The order does not exist" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.getOneOrder = getOneOrder;
async function addOrder(c) {
    const orderDetails = await c.req.json();
    const response = await (0, orders_service_1.createOrder)(orderDetails);
    try {
        if (response === null) {
            return c.json({ message: "The order was not created" }, 404);
        }
        return c.json({
            message: "Order was created successfully",
            content: response,
        });
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.addOrder = addOrder;
async function updateOrder(c) {
    const id = Number(c.req.param("id"));
    const updateContent = await c.req.json();
    const response = await (0, orders_service_1.serveOrderUpdate)(id, updateContent);
    try {
        if (response === null) {
            return c.json({ message: "The order does not exist" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.updateOrder = updateOrder;
async function removeOrder(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, orders_service_1.deleteOrder)(id);
    try {
        if (response === null) {
            return c.json({ message: "Order does not exist" }, 404);
        }
        else {
            return c.json({ message: "Order is deleted succesfully" });
        }
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.removeOrder = removeOrder;
