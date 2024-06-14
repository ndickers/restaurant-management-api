import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { state } from "../drizzle/schema";
export async function serveAllState() {
    return await db.query.state.findMany({
        with: {
            city: true,
        },
    });
}
export async function fetchOneState(id) {
    return await db.query.state.findMany({
        where: eq(state.id, id),
        with: {
            city: true,
        },
    });
}
export async function serveState(orderStatus) {
    return await db.insert(state).values(orderStatus).returning(state);
}
export async function serveStateUpdate(id, updates) {
    return await db.update(state).set(updates).where(eq(state.id, id)).returning({
        content: state,
    });
}
export async function deleteState(id) {
    return await db.delete(state).where(eq(state.id, id));
}
