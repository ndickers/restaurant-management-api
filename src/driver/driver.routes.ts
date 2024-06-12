import { Hono } from "hono";
import {
  getDrivers,
  postDriver,
  getOneDriver,
  removeDriver,
  updateDriver,
} from "./driver.controller";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const driverRoute = new Hono();

const inputDriver = z.object({
  car_make: z.string(),
  car_model: z.string(),
  car_year: z.number(),
  user_id: z.number(),
  online: z.boolean(),
  delivering: z.boolean(),
});

driverRoute.get("/drivers", getDrivers);

driverRoute.post(
  "/post/driver",
  zValidator("json", inputDriver, (result, c) => {
    if (!result.success) {
      const postError = result.error.issues[0];
      const { path, message, expected } = postError;
      if (message === "Required") {
        return c.json({ Error: `Field of ${path[0]} is missing` },404);
      } else {
        return c.json({
          Error: `Field of ${path[0]} only allow data of type ${expected}`,
        },404);
      }
    }
  }),
  postDriver
);
driverRoute.get("/driver/:id", getOneDriver);

driverRoute.patch("/update/driver/:id", updateDriver);

driverRoute.delete("/driver/remove/:id", removeDriver);
