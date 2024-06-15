import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { order_status, TIOrderStatus } from '../drizzle/schema';

export async function serveAllOrderStatus() {
  return await db.query.order_status.findMany({
    with: {
      status_catalogue: true,
      orders: true,
    },
  });
}

export async function fetchOneOrderStatus(id:number) {
  return await db.query.order_status.findMany({
    where: eq(order_status.id, id),
    with: {
      status_catalogue: true,
      orders: true,
    },
  });
}

export async function serveOrderStatus(orderStatus:TIOrderStatus) {
  return await db.insert(order_status).values(orderStatus);
}

export async function serveOrderStatusUpdate(id:number, updates:TIOrderStatus) {
  return await db
    .update(order_status)
    .set(updates)
    .where(eq(order_status.id, id));
}

export async function deleteOrderStatus(id:number) {
  return await db.delete(order_status).where(eq(order_status.id, id));
}
