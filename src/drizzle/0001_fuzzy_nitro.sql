ALTER TABLE "auth" DROP CONSTRAINT "auth_username_users_name_fk";
--> statement-breakpoint
ALTER TABLE "auth" ADD COLUMN "user_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth" ADD CONSTRAINT "auth_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
