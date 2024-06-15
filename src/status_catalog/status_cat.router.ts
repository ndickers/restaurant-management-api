import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import {
  getAllStatusCatalog,
  addStatusCatalog,
  getOneStatusCatalog,
  updateStatusCatalog,
  deleteCatalogStatus,
} from "./status_cat.controller";
import { adminAuth, authorizeAll } from "../middleware/authorize";

export const statusCatalogRoute = new Hono();

const inputStatusCatalog = z.object({
  name: z.string(),
});
statusCatalogRoute.delete(
  "/status-catalog/:id",
  authorizeAll,
  deleteCatalogStatus
);
statusCatalogRoute.get("/status-catalog", adminAuth, getAllStatusCatalog);
statusCatalogRoute.get(
  "/status-catalog/:id",
  authorizeAll,
  getOneStatusCatalog
);
statusCatalogRoute.patch(
  "/status-catalog/:id",
  authorizeAll,
  updateStatusCatalog
);
statusCatalogRoute.post(
  "/status-catalog",
  zValidator("json", inputStatusCatalog, (result, c) => {
    if (result.success) {
      return c.json({ message: "Succesfully added" });
    } else {
      return c.json({ message: "Confirm your data types" });
    }
  }),
  authorizeAll,
  addStatusCatalog
);
