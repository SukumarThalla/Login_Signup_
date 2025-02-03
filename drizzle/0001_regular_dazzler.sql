ALTER TABLE "userData" RENAME TO "usersData";--> statement-breakpoint
ALTER TABLE "usersData" DROP CONSTRAINT "userData_Email_unique";--> statement-breakpoint
ALTER TABLE "usersData" ADD PRIMARY KEY ("Id");--> statement-breakpoint
ALTER TABLE "usersData" ADD COLUMN "Password" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "usersData" DROP COLUMN "Password,";--> statement-breakpoint
ALTER TABLE "usersData" ADD CONSTRAINT "usersData_Email_unique" UNIQUE("Email");