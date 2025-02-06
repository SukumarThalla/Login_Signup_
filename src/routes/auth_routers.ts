import { Hono } from "Hono";
import { UserDataControllers } from "../controllers/UserDataController";
import { newPasswordValidation } from "../middleware/Validations";
import { validationCheck } from "../middleware/Validations";
import { jwtValidation } from "../middleware/authMiddleware";
const route_Handlers = new Hono();

route_Handlers.post("/signup", validationCheck, (c) =>
  UserDataControllers.signUp(c)
);
route_Handlers.post("/signin", (c: any) => UserDataControllers.signIn(c));

route_Handlers.post("/forget-password", (c: any) =>
  UserDataControllers.forgetPassword(c)
);
route_Handlers.post("/reset-password", newPasswordValidation, (c) =>
  UserDataControllers.resetPassword(c)
);
route_Handlers.get("/dashboard", jwtValidation, (c: any) =>
  UserDataControllers.dashBoard(c)
);

export { route_Handlers };
