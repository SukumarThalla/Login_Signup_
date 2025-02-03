import { Hono } from "hono/tiny";
import { usersdatacontroller } from "../controllers/Usersdatcontroller";
import { newpasswordValidation } from "../middleware/Validations";

const resetPassword = new Hono();

resetPassword.post("/", newpasswordValidation, (c) =>
  usersdatacontroller.resetPassword(c)
);

export { resetPassword };
