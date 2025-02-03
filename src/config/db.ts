import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import dotenv from "dotenv";
import fs from "fs";
import { usersData } from "../models/usersData";
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  database: process.env.DB,
  host: process.env.DB_HOST,
  port: 28725,
  user: process.env.USER,
  password: process.env.PASSWORD,
  ssl: {
    ca: fs.readFileSync("./ca.pem").toString(),
    rejectUnauthorized: true,
  },
});

const db = drizzle(pool, { schema: { usersData } });

db.execute("SELECT 1")
  .then(() => console.log("DB CONNECTED"))
  .catch(() => console.error("DB FAILED TO CONNECT"));

export { db };
