import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { order_status } from "../drizzle/schema";
export async function serveAllOrderStatus() {
    return await db.query.order_status.findMany({
        with: {
            status_catalogue: true,
            orders: true,
        },
    });
}
export async function fetchOneOrderStatus(id) {
    return await db.query.order_status.findMany({
        where: eq(order_status.id, id),
        with: {
            status_catalogue: true,
            orders: true,
        },
    });
}
export async function serveOrderStatus(orderStatus) {
    return await db
        .insert(order_status)
        .values(orderStatus)
        .returning(order_status);
}
export async function serveOrderStatusUpdate(id, updates) {
    return await db
        .update(order_status)
        .set(updates)
        .where(eq(order_status.id, id))
        .returning({
        content: order_status,
    });
}
export async function deleteOrderStatus(id) {
    return await db.delete(order_status).where(eq(order_status.id, id));
}
