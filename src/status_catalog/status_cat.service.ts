import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { status_catalog } from "../drizzle/schema";

export async function serveAllStatusCatalog(limit: number | undefined) {
  try {
    if (typeof limit === undefined) {
      return await db.query.status_catalog.findMany({
        with: {
          order_status: true,
        },
      });
    }
    return await db.query.status_catalog.findMany({
      with: {
        order_status: true,
      },
    });
  } catch (error) {
    return error;
  }
}

export async function fetchOneStatusCatalog(id) {
  try {
    const getOrderStatus = await db.query.status_catalog.findMany({
      where: eq(status_catalog.id, id),
      with: {
        order_status: true,
      },
    });
    if (getOrderStatus.length === 0) {
      return { message: "Order status not found" };
    }
    return getOrderStatus;
  } catch (error) {
    return {
      error: true,
      message: "Error try again later",
    };
  }
}

export async function serveStatusCatalog(orderStatus) {
  try {
    return await db
      .insert(status_catalog)
      .values(orderStatus)
      .returning(status_catalog);
  } catch (error) {
    return {
      error: true,
      message:
        "Make sure the item you are inserting is in the status_catalog and orders table ",
    };
  }
}

export async function serveStatusCatalogUpdate(id, updates) {
  try {
    return await db
      .update(status_catalog)
      .set(updates)
      .where(eq(status_catalog.id, id))
      .returning({
        content: status_catalog,
      });
  } catch (error) {
    return { error: true, message: "Unable to update. Try again later" };
  }
}

export async function deleteStatusCatalog(id) {
  return await db.delete(status_catalog).where(eq(status_catalog.id, id));
}
