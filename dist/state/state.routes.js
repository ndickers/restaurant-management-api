import { Hono } from "hono";
import { getOneState, addState, getAllState, updateState, removeState, } from "./state.controller";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { adminAuth, authorizeAll } from "../middleware/authorize";
export const stateRoutes = new Hono();
const inputState = z.object({
    name: z.string(),
    code: z.number(),
});
stateRoutes.get("/states", adminAuth, getAllState);
stateRoutes.get("/states/:id", authorizeAll, getOneState);
stateRoutes.post("/states", zValidator("json", inputState, (result, c) => {
    if (result.success) {
        return c.json({ message: "Succesfully added" });
    }
    else {
        return c.json({ message: "Confirm your data types" });
    }
}), authorizeAll, addState);
stateRoutes.patch("/states/:id", authorizeAll, updateState);
stateRoutes.delete("/states/:id", authorizeAll, removeState);
