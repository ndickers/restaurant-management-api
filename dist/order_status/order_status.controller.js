"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatusOrder = exports.updateOrderStatus = exports.addOrderStatus = exports.getOneOrderStatus = exports.getAllOrderStatus = void 0;
const order_status_service_1 = require("./order_status.service");
async function getAllOrderStatus(c) {
    const response = await (0, order_status_service_1.serveAllOrderStatus)();
    try {
        if (response === null) {
            return c.json({ message: "No registered order status exists" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json(error, 404);
    }
}
exports.getAllOrderStatus = getAllOrderStatus;
async function getOneOrderStatus(c) {
    const id = c.req.param("id");
    const response = await (0, order_status_service_1.fetchOneOrderStatus)(id);
    try {
        if (response === null) {
            return c.json({ message: "Order status not found" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json(error);
    }
}
exports.getOneOrderStatus = getOneOrderStatus;
async function addOrderStatus(c) {
    const orderStatus = await c.req.json("");
    const response = await (0, order_status_service_1.serveOrderStatus)(orderStatus);
    if (response === null) {
        return c.json({ message: "adding order status declined" }, 404);
    }
    return c.json({ message: "Order status was successfully created", response });
}
exports.addOrderStatus = addOrderStatus;
async function updateOrderStatus(c) {
    const id = c.req.param("id");
    const updateContent = await c.req.json();
    const response = await (0, order_status_service_1.serveOrderStatusUpdate)(id, updateContent);
    try {
        if (response === null) {
            return c.json({ message: "The order status does not exist" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json(response);
    }
}
exports.updateOrderStatus = updateOrderStatus;
async function deleteStatusOrder(c) {
    const id = c.req.param("id");
    const response = await (0, order_status_service_1.deleteOrderStatus)(id);
    try {
        if (response === null) {
            return c.json({ message: "Order status does not exist" });
        }
        else {
            return c.json({ message: "Order status is deleted succesfully" });
        }
    }
    catch (error) {
        return c.json(response, 404);
    }
}
exports.deleteStatusOrder = deleteStatusOrder;
