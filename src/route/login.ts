import { Hono } from "Hono";
import { usersdatacontroller } from "../controllers/Usersdatcontroller";
const login = new Hono();

login.post("/", (c: any) => usersdatacontroller.loginController(c));

export { login };
