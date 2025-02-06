import * as dotenv from "dotenv";
dotenv.config();
const dbConfig = {
  host: process.env.DB_HOST!,
  port: Number(process.env.PORT)!,
  user: process.env.USER!,
  password: process.env.PASSWORD,
  database: process.env.DB!,
};
export default dbConfig;

























// import { drizzle } from "drizzle-orm/node-postgres";
// import pg from "pg";
// import dotenv from "dotenv";
// import fs from "fs";
// import { usersData } from "../db/schemes/usersData";
// dotenv.config();

// const { Pool } = pg;

// const pool = new Pool({
//   database: process.env.DB,
//   host: process.env.DB_HOST,
//   port: 28725,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   ssl: {
//     ca: fs.readFileSync("./ca.pem").toString(),
//     rejectUnauthorized: true,
//   },
// });

// const db = drizzle(pool, { schema: { usersData } });

// db.execute("SELECT 1")
//   .then(() => console.log(" CONNECTED SUCCESSFULLY"))
//   .catch(() => console.error("FAILED TO CONNECT WITH DATABASE"));

// export { db };