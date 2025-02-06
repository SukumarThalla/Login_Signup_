import { drizzle } from "drizzle-orm/node-postgres";
import dbConfig from "../config/dbConfig";
import fs from "fs";
import { usersData } from "./schemes/usersData";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
  },
});

export const db = drizzle(pool, {
  schema: {
    usersData,
  },
});

db.execute("SELECT 1")
  .then(() => console.log(" CONNECTED SUCCESSFULLY"))
  .catch(() => console.error("FAILED TO CONNECT WITH DB"));
