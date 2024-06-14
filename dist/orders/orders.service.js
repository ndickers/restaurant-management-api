import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { orders } from "../drizzle/schema";
export async function serverAllOrders() {
    return await db.query.orders.findMany({
        with: {
            user: true,
            driver: true,
            restaurant: true,
            order_status: true,
            order_menu_item: true,
        },
    });
}
export async function createOrder(orderDetail) {
    return await db.insert(orders).values(orderDetail).returning(orders);
}
export async function fetchOneOrder(id) {
    return await db.query.orders.findMany({
        where: eq(orders.id, id),
        with: {
            user: true,
            driver: true,
            restaurant: true,
            order_status: true,
            order_menu_item: true,
        },
    });
}
export async function serveOrderUpdate(id, updates) {
    return await db
        .update(orders)
        .set(updates)
        .where(eq(orders.id, id))
        .returning({
        content: orders,
    });
}
export async function deleteOrder(id) {
    return await db.delete(orders).where(eq(orders.id, id));
}
