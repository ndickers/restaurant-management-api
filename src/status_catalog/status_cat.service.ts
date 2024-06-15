import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { status_catalog, TIStatusCat } from '../drizzle/schema';

export async function serveAllStatusCatalog() {
  return await db.query.status_catalog.findMany({
    with: {
      order_status: true,
    },
  });
}

export async function fetchOneStatusCatalog(id:number) {
  return await db.query.status_catalog.findMany({
    where: eq(status_catalog.id, id),
    with: {
      order_status: true,
    },
  });
}

export async function serveStatusCatalog(orderStatus:TIStatusCat) {
  return await db.insert(status_catalog).values(orderStatus);
}

export async function serveStatusCatalogUpdate(id:number, updates:TIStatusCat) {
  return await db
    .update(status_catalog)
    .set(updates)
    .where(eq(status_catalog.id, id));
}

export async function deleteStatusCatalog(id:number) {
  return await db.delete(status_catalog).where(eq(status_catalog.id, id));
}
