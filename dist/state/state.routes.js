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
    if (!result.success) {
        const postError = result.error.issues[0];
        const { path, message, expected } = postError;
        if (message === "Required") {
            return c.json({ Error: `Field of ${path[0]} is missing` }, 404);
        }
        else {
            return c.json({
                Error: `Field of ${path[0]} only allow data of type ${expected}`,
            }, 404);
        }
    }
}), authorizeAll, addState);
stateRoutes.patch("/states/:id", authorizeAll, updateState);
stateRoutes.delete("/states/:id", authorizeAll, removeState);
