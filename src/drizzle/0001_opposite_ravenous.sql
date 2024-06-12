ALTER TABLE "auth" DROP CONSTRAINT "auth_username_users_name_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth" ADD CONSTRAINT "auth_username_users_name_fk" FOREIGN KEY ("username") REFERENCES "public"."users"("name") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
