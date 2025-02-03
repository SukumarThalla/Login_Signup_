CREATE TABLE "PasswordRejecttoken" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Email" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	CONSTRAINT "PasswordRejecttoken_Email_unique" UNIQUE("Email")
);
