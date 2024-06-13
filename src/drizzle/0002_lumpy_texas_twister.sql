ALTER TABLE "state" ADD COLUMN "code" varchar;--> statement-breakpoint
ALTER TABLE "state" DROP COLUMN IF EXISTS "state_id";