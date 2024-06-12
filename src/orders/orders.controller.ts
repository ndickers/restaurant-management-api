import {
  serverAllOrders,
  createOrder,
  fetchOneOrderStatus,
  serveOrderUpdate,
  deleteOrder,
} from "./orders.service";
export async function getAllOrders(c) {
  const { limit } = c.req.query() as number;
  const orders = await serverAllOrders(limit);

  if (orders.error) {
    return c.json({ error: orders.message }, 404);
  }
  try {
    if (orders.length === 0) {
      return c.json({ message: "You haven't made an order yet" });
    }
    return c.json(orders);
  } catch (error) {
    return c.json({ message: "Server error, try again later" }, 404);
  }
}

export async function getOneOrder(c) {
  const id = c.req.param("id") as number;
  const response = await fetchOneOrder(id);
  if (response.error) {
    return c.json({ error: response.message }, 404);
  }
  return c.json(response);
}

export async function addOrder(c) {
  const orderDetails = await c.req.json("");
  const addingOrder = await createOrder(orderDetails);
  if (addingOrder.error) {
    return c.json({ error: addingOrder.message }, 404);
  } else {
    return c.json({
      message: "Order created succesfully",
      orderCreated: addingOrder,
    });
  }
  return c.json("added succesfull");
}

export async function updateOrder(c) {
  const id = c.req.param("id");
  const updateContent = await c.req.json("");

  const response = await serveOrderUpdate(id, updateContent);

  if (response.error) {
    return c.json({ message: response.message }, 404);
  }
  if (response.length === 0) {
    return c.json(
      { message: "The order does not exist. Create it first" },
      404
    );
  }
  return c.json(response);
}
export async function removeOrder(c) {
  const id = c.req.param("id") as number;
  const toBeDeleted = await deleteOrder(id);
  try {
    if (toBeDeleted.rowCount === 0) {
      return c.json({ message: "Order does not exist" }, 404);
    } else {
      return c.json({ message: "Order is deleted succesfully" });
    }
  } catch (error) {
    return c.json({ error: "Server error, try again later" }, 404);
  }
}
