import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import {
  getAllStatusCatalog,
  addStatusCatalog,
  getOneStatusCatalog,
  updateStatusCatalog,
  deleteCatalogStatus
} from "./status_cat.controller.ts";
export const statusCatalogRoute = new Hono();

const inputStatusCatalog = z.object({
  name: z.string(),
});
statusCatalogRoute.delete("/status-catalog/:id", deleteCatalogStatus);
statusCatalogRoute.get("/status-catalog", getAllStatusCatalog);
statusCatalogRoute.get("/status-catalog/:id", getOneStatusCatalog);
statusCatalogRoute.patch("/status-catalog/:id", updateStatusCatalog);
statusCatalogRoute.post(
  "/status-catalog",
  zValidator("json", inputStatusCatalog, (result, c) => {
    if (!result.success) {
      const postError = result.error.issues[0];
      const { path, message, expected } = postError;
      if (message === "Required") {
        return c.json({ Error: `Field of ${path[0]} is missing` }, 404);
      } else {
        return c.json(
          {
            Error: `Field of ${path[0]} only allow data of type ${expected}`,
          },
          404
        );
      }
    }
  }),
  addStatusCatalog
);
