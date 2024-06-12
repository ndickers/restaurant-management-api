CREATE TABLE IF NOT EXISTS "auth" (
	"id" serial NOT NULL,
	"username" varchar,
	"role" varchar,
	"passwordS" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "driver" (
	"id" serial PRIMARY KEY NOT NULL,
	"car_make" varchar,
	"car_model" varchar,
	"car_year" integer,
	"user_id" integer,
	"online" boolean,
	"delivering" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menu_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"restaurant_id" integer,
	"category_id" integer,
	"description" varchar,
	"ingredients" varchar,
	"price" numeric,
	"active" boolean,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_menu_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer,
	"menu_item_id" integer,
	"quantity" integer,
	"item_price" numeric,
	"price" numeric,
	"comment" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer,
	"status_catalog_id" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	" restaurant_id" integer,
	"estimated_delivery_time" date,
	"actual_delivery_time" date,
	"delivery_address_id" integer,
	"user_id" integer,
	"driver_id" integer,
	"price" numeric,
	"discount" numeric,
	"final_price" numeric,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurant" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"street_address" varchar,
	"zip_code" varchar,
	"city_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurant_owner" (
	"id" serial PRIMARY KEY NOT NULL,
	"restaurant_id" integer,
	"owner_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "status_catalog" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"contact" varchar,
	"phone_verified" boolean,
	"email" varchar,
	"email_verified" boolean,
	"confirmation_code" varchar,
	"password" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth" ADD CONSTRAINT "auth_username_users_name_fk" FOREIGN KEY ("username") REFERENCES "public"."users"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "driver" ADD CONSTRAINT "driver_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_menu_item" ADD CONSTRAINT "order_menu_item_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_menu_item" ADD CONSTRAINT "order_menu_item_menu_item_id_menu_item_id_fk" FOREIGN KEY ("menu_item_id") REFERENCES "public"."menu_item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_status" ADD CONSTRAINT "order_status_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_status" ADD CONSTRAINT "order_status_status_catalog_id_status_catalog_id_fk" FOREIGN KEY ("status_catalog_id") REFERENCES "public"."status_catalog"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_ restaurant_id_restaurant_id_fk" FOREIGN KEY (" restaurant_id") REFERENCES "public"."restaurant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_driver_id_driver_id_fk" FOREIGN KEY ("driver_id") REFERENCES "public"."driver"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurant_owner" ADD CONSTRAINT "restaurant_owner_restaurant_id_restaurant_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurant_owner" ADD CONSTRAINT "restaurant_owner_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
