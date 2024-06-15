import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { orders, TSOrder, TIOrder } from '../drizzle/schema';
export async function serverAllOrders(): Promise<TSOrder[] | null> {
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

export async function createOrder(orderDetail:TIOrder){
  return await db.insert(orders).values(orderDetail);
}

export async function fetchOneOrder(id: number) {
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

export async function serveOrderUpdate(id:number, updates:TIOrder) {
  return await db
    .update(orders)
    .set(updates)
    .where(eq(orders.id, id))
   
}

export async function deleteOrder(id:number) {
  return await db.delete(orders).where(eq(orders.id, id));
}
