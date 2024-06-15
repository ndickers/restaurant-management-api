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
  user_id: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  username: varchar("username"),
  role: varchar("role"),
  password: varchar("passwordS"),
});

export const authRelations = relations(auth, ({ one }) => ({
  user: one(users, {
    fields: [auth.id],
    references: [users.id],
  }),
}));
// const authRelations = relations

export const usersRelation = relations(users, ({ many, one }) => ({
  restaurant_owner: many(restaurant_owner),
  driver: many(driver),
  orders: many(orders),
  comment: many(comment),
  address: many(address),
}));

export const restaurant_owner = pgTable("restaurant_owner", {
  id: serial("id").primaryKey(),
  restaurant_id: integer("restaurant_id").references(() => restaurant.id, {
    onDelete: "cascade",
  }),
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

export const restaurantRelations = relations(restaurant, ({ many, one }) => ({
  restaurant_owner: many(restaurant_owner),
  orders: many(orders),
  menu_item: many(menu_item),
  city: one(city, {
    fields: [restaurant.city_id],
    references: [city.id],
  }),
}));

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  restaurant_id: integer(" restaurant_id").references(() => restaurant.id, {
    onDelete: "cascade",
  }),
  estimated_delivery_time: date("estimated_delivery_time"),
  actual_delivery_time: date("actual_delivery_time"),
  delivery_address_id: integer("delivery_address_id").references(
    () => address.id,
    {
      onDelete: "cascade",
    }
  ),
  user_id: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  driver_id: integer("driver_id").references(() => driver.id, {
    onDelete: "cascade",
  }),
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
    address: one(address, {
      fields: [orders.delivery_address_id],
      references: [address.id],
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
  order_id: integer("order_id").references(() => orders.id, {
    onDelete: "cascade",
  }),
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
  order_id: integer("order_id").references(() => orders.id, {
    onDelete: "cascade",
  }),
  menu_item_id: integer("menu_item_id").references(() => menu_item.id, {
    onDelete: "cascade",
  }),
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
  restaurant_id: integer("restaurant_id").references(() => restaurant.id, {
    onDelete: "cascade",
  }),
  category_id: integer("category_id").references(() => category.id, {
    onDelete: "cascade",
  }),
  description: varchar("description"),
  ingredients: varchar("ingredients"),
  price: numeric("price"),
  active: boolean("active"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const menuItemRelations = relations(menu_item, ({ many, one }) => ({
  order_menu_item: many(order_menu_item),
  category: one(category, {
    fields: [menu_item.category_id],
    references: [category.id],
  }),
  restaurant: one(restaurant, {
    fields: [menu_item.restaurant_id],
    references: [restaurant.id],
  }),
}));

export const city = pgTable("city", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
  state_id: integer("state_id").references(() => state.id, {
    onDelete: "cascade",
  }),
});

export const cityRelations = relations(city, ({ many, one }) => ({
  address: many(address),
  restaurant: many(restaurant),
  state: one(state, {
    fields: [city.state_id],
    references: [state.id],
  }),
}));

export const state = pgTable("state", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
  code: varchar("code"),
});

export const stateRelation = relations(state, ({ many }) => ({
  city: many(city),
}));

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
});
export const categoryRelations = relations(category, ({ many }) => ({
  menu_item: many(menu_item),
}));

export const address = pgTable("address", {
  id: serial("id").primaryKey(),
  street_address_1: varchar("street_address_1"),
  street_address_2: varchar("street_address_2"),
  zip_code: varchar("zip_code"),
  delivery_instructions: varchar("delivery_instructions"),
  user_id: integer("user_id").references(() => users.id),
  city_id: integer("city_id").references(() => city.id),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});
export const addressRelations = relations(address, ({ one, many }) => ({
  users: one(users, {
    fields: [address.user_id],
    references: [users.id],
  }),
  city: one(city, {
    fields: [address.city_id],
    references: [city.id],
  }),
  orders: many(orders),
}));

export const comment = pgTable("comment", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id"),
  order_id: integer("order_id").references(() => orders.id, {
    onDelete: "cascade",
  }),
  comment_text: varchar("comment_text"),
  is_complaint: boolean("is_complaint"),
  is_praise: boolean("is_praise"),
  street_address_2: varchar("street_address_2"),
  zip_code: varchar("zip_code"),
  delivery_instructions: varchar("delivery_instructions"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const commentRelations = relations(comment, ({ one }) => ({
  orders: one(orders, {
    fields: [comment.order_id],
    references: [orders.id],
  }),
  users: one(users, {
    fields: [comment.user_id],
    references: [users.id],
  }),
}));

export type TIRestaurant = typeof restaurant.$inferInsert;
export type TSRestaurant = typeof restaurant.$inferSelect;

export type TIStatusCat = typeof status_catalog.$inferInsert;
export type TSStatusCat = typeof status_catalog.$inferSelect;

export type TIOwner = typeof restaurant_owner.$inferInsert;
export type TSOwner = typeof restaurant_owner.$inferSelect;

export type TIState = typeof state.$inferInsert;
export type TSState = typeof state.$inferSelect;

export type TIUser = typeof users.$inferInsert;
export type TSUser = typeof users.$inferSelect;

export type TIDriver = typeof driver.$inferInsert;
export type TSDriver = typeof driver.$inferSelect;

export type TIaddress = typeof address.$inferInsert;
export type TSaddress = typeof address.$inferSelect;

export type TIOrder = typeof orders.$inferInsert;
export type TSOrder = typeof orders.$inferSelect;

export type TICategory = typeof category.$inferInsert;
export type TSCategory = typeof category.$inferSelect;

export type TIAuth = typeof auth.$inferInsert;
export type TSAuth = typeof auth.$inferSelect;

export type TIOrderStatus = typeof order_status.$inferInsert;
export type TSOrderStatus = typeof order_status.$inferSelect;

export type TIMenuItem = typeof menu_item.$inferInsert;
export type TSMenuItem = typeof menu_item.$inferSelect;

export type TICity = typeof city.$inferInsert;
export type TSCity = typeof city.$inferSelect;

export type TIComment = typeof comment.$inferInsert;
export type TSComment = typeof comment.$inferSelect;

export type TIOrderMenu = typeof order_menu_item.$inferInsert;
export type TSOrderMenu = typeof order_menu_item.$inferSelect;
