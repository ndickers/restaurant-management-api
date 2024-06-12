import db from "../drizzle/db";
import { driver, orders } from "../drizzle/schema";
import { eq } from "drizzle-orm";
export async function serverAllDriver(limit: number | undefined) {
  try {
    if (typeof limit === undefined) {
      return await db.query.driver.findMany({
        with: {
          users: true,
          orders: true,
        },
      });
    }
    return await db.query.driver.findMany({
      limit: limit,
      with: {
        users: true,
        orders: true,
      },
    });
  } catch (error) {
    return error;
  }
}

export async function addDriver(driverDetail) {
  try {
    return await db.insert(driver).values(driverDetail).returning(driver);
  } catch (error) {
    return "cannot insert";
  }
}

export async function serveUpdate(id, driverUpdates) {
  try {
    return await db
      .update(driver)
      .set(driverUpdates)
      .where(eq(driver.id, id))
      .returning({
        content: driver,
      });
  } catch (error) {
    return error;
  }
}

export async function fetchOneDriver(id) {
  return await db.query.driver.findMany({
    where: eq(driver.id, id),
    with: {
      users: true,
      orders: true,
    },
  });
}

export async function deleteDriver(id) {
  return await db.delete(driver).where(eq(driver.id, id));
}
