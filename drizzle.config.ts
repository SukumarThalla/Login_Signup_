import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

export default {
  schema: "./src/models/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    database: process.env.DB,
    host: process.env.DB_HOST,
    port: Number(process.env.PORT),
    user: process.env.USER,
    password: process.env.PASSWORD,
  },
  ssl: {
    ca: fs.readFileSync("./ca.pem").toString(),
    rejectUnauthorized: true,
  },
};
