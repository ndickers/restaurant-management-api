import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { state, TIState } from '../drizzle/schema';

export async function serveAllState() {
  return await db.query.state.findMany({
    with: {
      city: true,
    },
  });
}

export async function fetchOneState(id:number) {
  return await db.query.state.findMany({
    where: eq(state.id, id),
    with: {
      city: true,
    },
  });
}

export async function serveState(orderStatus:TIState) {
  return await db.insert(state).values(orderStatus);
}

export async function serveStateUpdate(id:number, updates:TIState) {
  return await db.update(state).set(updates).where(eq(state.id, id));
}

export async function deleteState(id:number) {
  return await db.delete(state).where(eq(state.id, id));
}
