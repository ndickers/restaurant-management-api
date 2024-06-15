import { serveAllOrderStatus, serveOrderStatus, fetchOneOrderStatus, serveOrderStatusUpdate, deleteOrderStatus, } from "./order_status.service";
export async function getAllOrderStatus(c) {
    const response = await serveAllOrderStatus();
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
export async function getOneOrderStatus(c) {
    const id = Number(c.req.param("id"));
    const response = await fetchOneOrderStatus(id);
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
export async function addOrderStatus(c) {
    const orderStatus = await c.req.json();
    const response = await serveOrderStatus(orderStatus);
    if (response === null) {
        return c.json({ message: "adding order status declined" }, 404);
    }
    return c.json({ message: "Order status was successfully created", response });
}
export async function updateOrderStatus(c) {
    const id = Number(c.req.param("id"));
    const updateContent = await c.req.json();
    const response = await serveOrderStatusUpdate(id, updateContent);
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
export async function deleteStatusOrder(c) {
    const id = Number(c.req.param("id"));
    const response = await deleteOrderStatus(id);
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
