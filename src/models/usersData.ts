import { timestamp } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";
import { serial } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const usersData = pgTable("usersData", {
  Id: serial("Id").primaryKey(),
  email: varchar("Email", { length: 255 }).unique().notNull(),
  password: varchar("Password", { length: 255 }).notNull(),
});

export const PasswordRejecttoken = pgTable("PasswordRejecttoken", {
  Id: serial("Id").primaryKey(),
  email: varchar("Email", { length: 255 }).unique().notNull(),
  token: varchar("token", { length: 255 }).notNull(),
  expires_date: timestamp("expires_at").notNull(),
});
