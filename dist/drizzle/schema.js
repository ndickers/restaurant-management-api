"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRelations = exports.comment = exports.addressRelations = exports.address = exports.categoryRelations = exports.category = exports.stateRelation = exports.state = exports.cityRelations = exports.city = exports.menuItemRelations = exports.menu_item = exports.orderMenuRelations = exports.order_menu_item = exports.statusCatalogRelations = exports.status_catalog = exports.orderStatusRelations = exports.order_status = exports.orderRelations = exports.orders = exports.restaurantRelations = exports.driverRelation = exports.driver = exports.restaurant = exports.restaurantOwnerRelation = exports.restaurant_owner = exports.usersRelation = exports.authRelations = exports.auth = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name"),
    contact_phone: (0, pg_core_1.varchar)("contact"),
    phone_verified: (0, pg_core_1.boolean)("phone_verified"),
    email: (0, pg_core_1.varchar)("email"),
    email_verified: (0, pg_core_1.boolean)("email_verified"),
    confirmation_code: (0, pg_core_1.varchar)("confirmation_code"),
    password: (0, pg_core_1.varchar)("password"),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.auth = (0, pg_core_1.pgTable)("auth", {
    id: (0, pg_core_1.serial)("id"),
    user_id: (0, pg_core_1.integer)("user_id").references(() => exports.users.id, {
        onDelete: "cascade",
    }),
    username: (0, pg_core_1.varchar)("username"),
    role: (0, pg_core_1.varchar)("role"),
    password: (0, pg_core_1.varchar)("passwordS"),
});
exports.authRelations = (0, drizzle_orm_1.relations)(exports.auth, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.auth.id],
        references: [exports.users.id],
    }),
}));
// const authRelations = relations
exports.usersRelation = (0, drizzle_orm_1.relations)(exports.users, ({ many, one }) => ({
    restaurant_owner: many(exports.restaurant_owner),
    driver: many(exports.driver),
    orders: many(exports.orders),
    comment: many(exports.comment),
    address: many(exports.address),
}));
exports.restaurant_owner = (0, pg_core_1.pgTable)("restaurant_owner", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    restaurant_id: (0, pg_core_1.integer)("restaurant_id").references(() => exports.restaurant.id, {
        onDelete: "cascade",
    }),
    owner_id: (0, pg_core_1.integer)("owner_id").references(() => exports.users.id, {
        onDelete: "cascade",
    }),
});
exports.restaurantOwnerRelation = (0, drizzle_orm_1.relations)(exports.restaurant_owner, ({ one }) => ({
    users: one(exports.users, {
        fields: [exports.restaurant_owner.owner_id],
        references: [exports.users.id],
    }),
    restaurant: one(exports.restaurant, {
        fields: [exports.restaurant_owner.restaurant_id],
        references: [exports.restaurant.id],
    }),
}));
exports.restaurant = (0, pg_core_1.pgTable)("restaurant", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name"),
    street_address: (0, pg_core_1.varchar)("street_address"),
    zip_code: (0, pg_core_1.varchar)("zip_code"),
    city_id: (0, pg_core_1.integer)("city_id"),
});
exports.driver = (0, pg_core_1.pgTable)("driver", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    car_make: (0, pg_core_1.varchar)("car_make"),
    car_model: (0, pg_core_1.varchar)("car_model"),
    car_year: (0, pg_core_1.integer)("car_year"),
    user_id: (0, pg_core_1.integer)("user_id").references(() => exports.users.id, {
        onDelete: "cascade",
    }),
    online: (0, pg_core_1.boolean)("online"),
    delivering: (0, pg_core_1.boolean)("delivering"),
});
exports.driverRelation = (0, drizzle_orm_1.relations)(exports.driver, ({ one, many }) => ({
    users: one(exports.users, {
        fields: [exports.driver.user_id],
        references: [exports.users.id],
    }),
    orders: many(exports.orders),
}));
exports.restaurantRelations = (0, drizzle_orm_1.relations)(exports.restaurant, ({ many, one }) => ({
    restaurant_owner: many(exports.restaurant_owner),
    orders: many(exports.orders),
    menu_item: many(exports.menu_item),
    city: one(exports.city, {
        fields: [exports.restaurant.city_id],
        references: [exports.city.id],
    }),
}));
exports.orders = (0, pg_core_1.pgTable)("orders", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    restaurant_id: (0, pg_core_1.integer)(" restaurant_id").references(() => exports.restaurant.id, {
        onDelete: "cascade",
    }),
    estimated_delivery_time: (0, pg_core_1.date)("estimated_delivery_time"),
    actual_delivery_time: (0, pg_core_1.date)("actual_delivery_time"),
    delivery_address_id: (0, pg_core_1.integer)("delivery_address_id").references(() => exports.address.id, {
        onDelete: "cascade",
    }),
    user_id: (0, pg_core_1.integer)("user_id").references(() => exports.users.id, {
        onDelete: "cascade",
    }),
    driver_id: (0, pg_core_1.integer)("driver_id").references(() => exports.driver.id, {
        onDelete: "cascade",
    }),
    price: (0, pg_core_1.numeric)("price"),
    discount: (0, pg_core_1.numeric)("discount"),
    final_price: (0, pg_core_1.numeric)("final_price"),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.orderRelations = (0, drizzle_orm_1.relations)(exports.orders, ({ one, many }) => {
    return {
        user: one(exports.users, {
            fields: [exports.orders.user_id],
            references: [exports.users.id],
        }),
        driver: one(exports.driver, {
            fields: [exports.orders.driver_id],
            references: [exports.driver.id],
        }),
        address: one(exports.address, {
            fields: [exports.orders.delivery_address_id],
            references: [exports.address.id],
        }),
        restaurant: one(exports.restaurant, {
            fields: [exports.orders.restaurant_id],
            references: [exports.restaurant.id],
        }),
        order_status: many(exports.order_status),
        order_menu_item: many(exports.order_menu_item),
    };
});
exports.order_status = (0, pg_core_1.pgTable)("order_status", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    order_id: (0, pg_core_1.integer)("order_id").references(() => exports.orders.id, {
        onDelete: "cascade",
    }),
    status_catalog_id: (0, pg_core_1.integer)("status_catalog_id").references(() => exports.status_catalog.id),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.orderStatusRelations = (0, drizzle_orm_1.relations)(exports.order_status, ({ one }) => ({
    status_catalogue: one(exports.status_catalog, {
        fields: [exports.order_status.status_catalog_id],
        references: [exports.status_catalog.id],
    }),
    orders: one(exports.orders, {
        fields: [exports.order_status.id],
        references: [exports.orders.id],
    }),
}));
exports.status_catalog = (0, pg_core_1.pgTable)("status_catalog", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name"),
});
exports.statusCatalogRelations = (0, drizzle_orm_1.relations)(exports.status_catalog, ({ many }) => ({
    order_status: many(exports.order_status),
}));
exports.order_menu_item = (0, pg_core_1.pgTable)("order_menu_item", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    order_id: (0, pg_core_1.integer)("order_id").references(() => exports.orders.id, {
        onDelete: "cascade",
    }),
    menu_item_id: (0, pg_core_1.integer)("menu_item_id").references(() => exports.menu_item.id, {
        onDelete: "cascade",
    }),
    quantity: (0, pg_core_1.integer)("quantity"),
    item_price: (0, pg_core_1.numeric)("item_price"),
    price: (0, pg_core_1.numeric)("price"),
    comment: (0, pg_core_1.text)("comment"),
});
exports.orderMenuRelations = (0, drizzle_orm_1.relations)(exports.order_menu_item, ({ one }) => ({
    orders: one(exports.orders, {
        fields: [exports.order_menu_item.order_id],
        references: [exports.orders.id],
    }),
    menu_item: one(exports.menu_item, {
        fields: [exports.order_menu_item.menu_item_id],
        references: [exports.menu_item.id],
    }),
}));
exports.menu_item = (0, pg_core_1.pgTable)("menu_item", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name"),
    restaurant_id: (0, pg_core_1.integer)("restaurant_id").references(() => exports.restaurant.id, {
        onDelete: "cascade",
    }),
    category_id: (0, pg_core_1.integer)("category_id").references(() => exports.category.id, {
        onDelete: "cascade",
    }),
    description: (0, pg_core_1.varchar)("description"),
    ingredients: (0, pg_core_1.varchar)("ingredients"),
    price: (0, pg_core_1.numeric)("price"),
    active: (0, pg_core_1.boolean)("active"),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.menuItemRelations = (0, drizzle_orm_1.relations)(exports.menu_item, ({ many, one }) => ({
    order_menu_item: many(exports.order_menu_item),
    category: one(exports.category, {
        fields: [exports.menu_item.category_id],
        references: [exports.category.id],
    }),
    restaurant: one(exports.restaurant, {
        fields: [exports.menu_item.restaurant_id],
        references: [exports.restaurant.id],
    }),
}));
exports.city = (0, pg_core_1.pgTable)("city", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name"),
    state_id: (0, pg_core_1.integer)("state_id").references(() => exports.state.id, {
        onDelete: "cascade",
    }),
});
exports.cityRelations = (0, drizzle_orm_1.relations)(exports.city, ({ many, one }) => ({
    address: many(exports.address),
    restaurant: many(exports.restaurant),
    state: one(exports.state, {
        fields: [exports.city.state_id],
        references: [exports.state.id],
    }),
}));
exports.state = (0, pg_core_1.pgTable)("state", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name"),
    code: (0, pg_core_1.varchar)("code"),
});
exports.stateRelation = (0, drizzle_orm_1.relations)(exports.state, ({ many }) => ({
    city: many(exports.city),
}));
exports.category = (0, pg_core_1.pgTable)("category", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name"),
});
exports.categoryRelations = (0, drizzle_orm_1.relations)(exports.category, ({ many }) => ({
    menu_item: many(exports.menu_item),
}));
exports.address = (0, pg_core_1.pgTable)("address", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    street_address_1: (0, pg_core_1.varchar)("street_address_1"),
    street_address_2: (0, pg_core_1.varchar)("street_address_2"),
    zip_code: (0, pg_core_1.varchar)("zip_code"),
    delivery_instructions: (0, pg_core_1.varchar)("delivery_instructions"),
    user_id: (0, pg_core_1.integer)("user_id").references(() => exports.users.id),
    city_id: (0, pg_core_1.integer)("city_id").references(() => exports.city.id),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.addressRelations = (0, drizzle_orm_1.relations)(exports.address, ({ one, many }) => ({
    users: one(exports.users, {
        fields: [exports.address.user_id],
        references: [exports.users.id],
    }),
    city: one(exports.city, {
        fields: [exports.address.city_id],
        references: [exports.city.id],
    }),
    orders: many(exports.orders),
}));
exports.comment = (0, pg_core_1.pgTable)("comment", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    user_id: (0, pg_core_1.integer)("user_id"),
    order_id: (0, pg_core_1.integer)("order_id").references(() => exports.orders.id, {
        onDelete: "cascade",
    }),
    comment_text: (0, pg_core_1.varchar)("comment_text"),
    is_complaint: (0, pg_core_1.boolean)("is_complaint"),
    is_praise: (0, pg_core_1.boolean)("is_praise"),
    street_address_2: (0, pg_core_1.varchar)("street_address_2"),
    zip_code: (0, pg_core_1.varchar)("zip_code"),
    delivery_instructions: (0, pg_core_1.varchar)("delivery_instructions"),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.commentRelations = (0, drizzle_orm_1.relations)(exports.comment, ({ one }) => ({
    orders: one(exports.orders, {
        fields: [exports.comment.order_id],
        references: [exports.orders.id],
    }),
    users: one(exports.users, {
        fields: [exports.comment.user_id],
        references: [exports.users.id],
    }),
}));
