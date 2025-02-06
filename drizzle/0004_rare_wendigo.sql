ALTER TABLE "PasswordRejecttoken" RENAME TO "PasswordRejectToken";--> statement-breakpoint
ALTER TABLE "PasswordRejectToken" DROP CONSTRAINT "PasswordRejecttoken_Email_unique";--> statement-breakpoint
ALTER TABLE "PasswordRejectToken" ADD CONSTRAINT "PasswordRejectToken_Email_unique" UNIQUE("Email");