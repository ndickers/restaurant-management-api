import db from "../drizzle/db";
import { driver, orders, TSDriver, TIDriver, TSUser } from "../drizzle/schema";
import { eq } from "drizzle-orm";
export async function serverAllDriver() {
  return await db.query.driver.findMany({
    with: {
      users: true,
      orders: true,
    },
  });
}

export async function addDriver(driverDetail: TIDriver): Promise<TSDriver> {
  try {
    return await db.insert(driver).values(driverDetail).returning(driver);
  } catch (error) {
    return "cannot insert";
  }
}

export async function serveUpdate(
  id: number,
  driverUpdates: TIDriver
): Promise<TSDriver> {
  return await db
    .update(driver)
    .set(driverUpdates)
    .where(eq(driver.id, id))
    .returning({
      content: driver,
    });
}

export async function fetchOneDriver(id: number): Promise<TSDriver> {
  return await db.query.driver.findMany({
    where: eq(driver.id, id),
    with: {
      users: true,
      orders: true,
    },
  });
}

export async function deleteDriver(id: number) {
  return await db.delete(driver).where(eq(driver.id, id));
}
