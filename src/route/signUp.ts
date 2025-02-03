import { Hono } from "hono/tiny";
import { usersdatacontroller } from "../controllers/Usersdatcontroller";
import { validationCheck } from "../middleware/Validations";
const signUp = new Hono();

signUp.post("/", validationCheck, (c) =>
  usersdatacontroller.SignupController(c)
);

export { signUp };
