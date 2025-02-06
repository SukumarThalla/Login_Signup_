import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const jwtValidation = async (c: any, next: any) => {
  try {
    const token = await c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Token Not found" });
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      return c.json({
        error: "Unable to Find the secretKey, Please Check it in .env",
      });
    }
    const decoded = verify(token, secretKey);
    c.req.user = decoded;
    await next();
  } catch (error) {
    return c.json({ error: "Invalid token error" }, 422);
  }
};
