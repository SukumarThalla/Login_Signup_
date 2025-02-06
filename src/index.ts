import { Hono } from "Hono";
import { serve } from "@hono/node-server";
import "./db/dbConnection";
import { route_Handlers } from "./routes/auth_routers";
const app = new Hono();

app.get("/", (c) => {
  return c.json({ success: "HI WELCOME PLEASE LOGIN WIH YOUR DETAILS" }, 200);
});

app.route("/", route_Handlers);

serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("server is running at http://localhost:3000");
