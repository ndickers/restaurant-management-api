import { serverAllOrders, createOrder, fetchOneOrder, serveOrderUpdate, deleteOrder, } from "./orders.service";
export async function getAllOrders(c) {
    const response = await serverAllOrders();
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
export async function getOneOrder(c) {
    const id = Number(c.req.param("id"));
    const response = await fetchOneOrder(id);
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
export async function addOrder(c) {
    const orderDetails = await c.req.json();
    const response = await createOrder(orderDetails);
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
export async function updateOrder(c) {
    const id = Number(c.req.param("id"));
    const updateContent = await c.req.json();
    const response = await serveOrderUpdate(id, updateContent);
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
export async function removeOrder(c) {
    const id = Number(c.req.param("id"));
    const response = await deleteOrder(id);
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
