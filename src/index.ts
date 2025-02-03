import { Hono } from "Hono";
import { serve } from "@hono/node-server";
import "./config/db";
import { signUp } from "./route/signUp";
import { login } from "./route/login";
import { forgetPassword } from "./route/forgetpassword";
import { resetPassword } from "./route/resetPassword";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ success: "HI WELCOME PLEASE LOGIN WIH YOUR DETAILS" }, 200);
});

app.route("/signup", signUp);
app.route("/login", login);
app.route("/forget-password", forgetPassword);
app.route("/reset-password", resetPassword);

serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("server is running at http://localhost:3000");
