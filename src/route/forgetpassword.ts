import { Hono } from "Hono";
import { usersdatacontroller } from "../controllers/Usersdatcontroller";

const forgetPassword = new Hono();

forgetPassword.post("/", (c: any) => usersdatacontroller.forgetPassword(c));

export { forgetPassword };
