import db from "../drizzle/db";
import { driver } from "../drizzle/schema";
import { eq } from "drizzle-orm";
export async function serverAllDriver() {
    return await db.query.driver.findMany({
        with: {
            users: true,
            orders: true,
        },
    });
}
export async function addDriver(driverDetail) {
    return await db.insert(driver).values(driverDetail);
}
export async function serveUpdate(id, driverUpdates) {
    return await db.update(driver).set(driverUpdates).where(eq(driver.id, id));
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
