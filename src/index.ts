import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { userRoute } from "./users/users.route";
import { driverRoute } from "./driver/driver.routes";
import { restaurantRoute } from "./restaurant/restaurant.routes";
import { ordersRoutes } from "./orders/orders.routes";
import { orderStatusRoute } from "./order_status/order_status.routes";
import { ordersRoutes } from "./orders/orders.routes";
import { authRoute } from "./auth/auth.routes";
import { ownersRoutes } from "./restaurant_owner/owner.routes";
const app = new Hono();

app.route("/", userRoute);
app.route("/", driverRoute);
app.route("/", restaurantRoute);
app.route("/", orderStatusRoute);
app.route("/", ordersRoutes);
app.route("/", authRoute);
app.route("/", ownersRoutes);
const port = 8080;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
