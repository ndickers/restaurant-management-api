import { Hono } from "hono";
import { getOneCity, addCity, getAllCity, updateCity, removeCity, } from "./city.controller";
import { adminAuth, authorizeAll } from "../middleware/authorize";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
export const cityRoutes = new Hono();
const inputCity = z.object({
    name: z.string(),
    code: z.number(),
    state_id: z.number(),
});
cityRoutes.get("/city", adminAuth, getAllCity);
cityRoutes.get("/city/:id", authorizeAll, getOneCity);
cityRoutes.post("/city", zValidator("json", inputCity, (result, c) => {
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
}), authorizeAll, addCity);
cityRoutes.patch("/city/:id", authorizeAll, updateCity);
cityRoutes.delete("/city/:id", authorizeAll, removeCity);
