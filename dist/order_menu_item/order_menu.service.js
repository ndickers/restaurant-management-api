import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { order_menu_item } from "../drizzle/schema";
export async function serveAllOrderMenu() {
    return await db.query.order_menu_item.findMany({
        with: {
            orders: true,
            menu_item: true,
        },
    });
}
export async function fetchOneOrderMenu(id) {
    return await db.query.order_menu_item.findMany({
        where: eq(order_menu_item.id, id),
        with: {
            orders: true,
            menu_item: true,
        },
    });
}
export async function serveOrderMenu(orderStatus) {
    return await db.insert(order_menu_item).values(orderStatus);
}
export async function serveOrderMenuUpdate(id, updates) {
    return await db
        .update(order_menu_item)
        .set(updates)
        .where(eq(order_menu_item.id, id))
        .returning({
        content: order_menu_item,
    });
}
export async function deleteOrderMenu(id) {
    return await db.delete(order_menu_item).where(eq(order_menu_item.id, id));
}
