CREATE TABLE "userData" (
	"Id" serial NOT NULL,
	"Email" varchar(255) NOT NULL,
	"Password," varchar(255) NOT NULL,
	CONSTRAINT "userData_Email_unique" UNIQUE("Email")
);
