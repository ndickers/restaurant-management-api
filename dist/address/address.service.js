import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { address } from "../drizzle/schema";
export async function serveAllAddress() {
    return await db.query.address.findMany({
        with: {
            city: true,
            users: true,
            orders: true,
        },
    });
}
export async function fetchOneAddress(id) {
    return await db.query.address.findMany({
        where: eq(address.id, id),
        with: {
            city: true,
            users: true,
            orders: true,
        },
    });
}
export async function addAddress(val) {
    return await db.insert(address).values(val);
}
export async function serveAddressUpdate(id, updates) {
    return await db.update(address).set(updates).where(eq(address.id, id));
}
export async function deleteAddress(id) {
    return await db.delete(address).where(eq(address.id, id));
}
