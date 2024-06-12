import {
  pgTable,
  integer,
  varchar,
  serial,
  date,
  timestamp,
  boolean,
  numeric,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
  contact_phone: varchar("contact"),
  phone_verified: boolean("phone_verified"),
  email: varchar("email"),
  email_verified: boolean("email_verified"),
  confirmation_code: varchar("confirmation_code"),
  password: varchar("password"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const auth = pgTable("auth", {
  id: serial("id"),
  username: varchar("username").references(() => users.name),
  role: varchar("role"),
  password: varchar("passwordS"),
});

export const authRelations = relations(auth, ({ one }) => ({
  user: one(users, {
    fields: [auth.username],
    references: [users.name],
  }),                                                        
}));
// const authRelations = relations

export const usersRelation = relations(users, ({ many, one }) => ({
  restaurant_owner: many(restaurant_owner),
  driver: many(driver),
  orders: many(orders),
}));

export const restaurant_owner = pgTable("restaurant_owner", {
  id: serial("id").primaryKey(),
  restaurant_id: integer("restaurant_id").references(() => restaurant.id),
  owner_id: integer("owner_id").references(() => users.id, {
    onDelete: "cascade",
  }),
});
export const restaurantOwnerRelation = relations(
  restaurant_owner,
  ({ one }) => ({
    users: one(users, {
      fields: [restaurant_owner.owner_id],
      references: [users.id],
    }),
    restaurant: one(restaurant, {
      fields: [restaurant_owner.restaurant_id],
      references: [restaurant.id],
    }),
  })
);
export const restaurant = pgTable("restaurant", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
  street_address: varchar("street_address"),
  zip_code: varchar("zip_code"),
  city_id: integer("city_id"),
});

export const driver = pgTable("driver", {
  id: serial("id").primaryKey(),
  car_make: varchar("car_make"),
  car_model: varchar("car_model"),
  car_year: integer("car_year"),
  user_id: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  online: boolean("online"),
  delivering: boolean("delivering"),
});
export const driverRelation = relations(driver, ({ one, many }) => ({
  users: one(users, {
    fields: [driver.user_id],
    references: [users.id],
  }),
  orders: many(orders),
}));

export const restaurantRelations = relations(restaurant, ({ many }) => ({
  restaurant_owner: many(restaurant_owner),
  orders: many(orders),
}));

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  restaurant_id: integer(" restaurant_id").references(() => restaurant.id),
  estimated_delivery_time: date("estimated_delivery_time"),
  actual_delivery_time: date("actual_delivery_time"),
  delivery_address_id: integer("delivery_address_id"),
  user_id: integer("user_id").references(() => users.id),
  driver_id: integer("driver_id").references(() => driver.id),
  price: numeric("price"),
  discount: numeric("discount"),
  final_price: numeric("final_price"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const orderRelations = relations(orders, ({ one, many }) => {
  return {
    user: one(users, {
      fields: [orders.user_id],
      references: [users.id],
    }),
    driver: one(driver, {
      fields: [orders.driver_id],
      references: [driver.id],
    }),
    restaurant: one(restaurant, {
      fields: [orders.restaurant_id],
      references: [restaurant.id],
    }),
    order_status: many(order_status),
    order_menu_item: many(order_menu_item),
  };
});
export const order_status = pgTable("order_status", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id").references(() => orders.id),
  status_catalog_id: integer("status_catalog_id").references(
    () => status_catalog.id
  ),
  created_at: timestamp("created_at").defaultNow(),
});
export const orderStatusRelations = relations(order_status, ({ one }) => ({
  status_catalogue: one(status_catalog, {
    fields: [order_status.status_catalog_id],
    references: [status_catalog.id],
  }),
  orders: one(orders, {
    fields: [order_status.id],
    references: [orders.id],
  }),
}));

export const status_catalog = pgTable("status_catalog", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
});

export const statusCatalogRelations = relations(status_catalog, ({ many }) => ({
  order_status: many(order_status),
}));

export const order_menu_item = pgTable("order_menu_item", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id").references(() => orders.id),
  menu_item_id: integer("menu_item_id").references(() => menu_item.id),
  quantity: integer("quantity"),
  item_price: numeric("item_price"),
  price: numeric("price"),
  comment: text("comment"),
});
export const orderMenuRelations = relations(order_menu_item, ({ one }) => ({
  orders: one(orders, {
    fields: [order_menu_item.order_id],
    references: [orders.id],
  }),
  menu_item: one(menu_item, {
    fields: [order_menu_item.menu_item_id],
    references: [menu_item.id],
  }),
}));

export const menu_item = pgTable("menu_item", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
  restaurant_id: integer("restaurant_id"),
  category_id: integer("category_id"),
  description: varchar("description"),
  ingredients: varchar("ingredients"),
  price: numeric("price"),
  active: boolean("active"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("created_at").defaultNow(),
});

// export const menuItemRelations = relations(menu_item, ({ many }) => ({
//   menu_item: many(menu_item),
// }));
