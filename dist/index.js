import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { userRoute } from "./users/users.route";
import { driverRoute } from "./driver/driver.routes";
import { restaurantRoute } from "./restaurant/restaurant.routes";
import { ordersRoutes } from "./orders/orders.routes";
import { orderStatusRoute } from "./order_status/order_status.routes";
import { authRoute } from "./auth/auth.routes";
import { ownersRoutes } from "./restaurant_owner/owner.routes";
import { statusCatalogRoute } from "./status_catalog/status_cat.router";
import { orderMenuRoute } from "./order_menu_item/order_menu.route";
import { menuItemRoute } from "./menu_item/menu_item.route";
import { commentRoute } from "./comment/comment.routes";
import { stateRoutes } from "./state/state.routes";
import { cityRoutes } from "./city/city.route";
import { addressRoutes } from "./address/address.route";
import { categoryRoutes } from "./category/category.routes";
const app = new Hono();
app.route("/", userRoute);
app.route("/", driverRoute);
app.route("/", restaurantRoute);
app.route("/", orderStatusRoute);
app.route("/", ordersRoutes);
app.route("/", authRoute);
app.route("/", ownersRoutes);
app.route("/", statusCatalogRoute);
app.route("/", orderMenuRoute);
app.route("/", menuItemRoute);
app.route("/", commentRoute);
app.route("/", stateRoutes);
app.route("/", cityRoutes);
app.route("/", addressRoutes);
app.route("/", categoryRoutes);
const port = 8080;
console.log(`Server is running on port ${port}`);
serve({
    fetch: app.fetch,
    port,
});
