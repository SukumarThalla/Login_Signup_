import { UserDataQuires } from "../services/Post_details";
import crypto from "crypto";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { sendEmailToResetPassword } from "../services/resetMail";
import { Context } from "Hono";
dotenv.config();
class UserDataController {
  async signUp(c: Context) {
    try {
      const userData = await c.req.json();
      const AccountExistCheck = await UserDataQuires.accountExistCheck(
        userData.email
      );

      if (AccountExistCheck.length > 0) {
        return c.json({ error: "Account Already Exists" }, 200);
      } else {
        //HashPassword Creation with bcrypt library
        const hashPassword = await bcrypt.hash(userData.password, 10);
        await UserDataQuires.storingNewAccountDetails(
          userData.email,
          hashPassword
        );

        return c.json(
          { success: "SUCCESSFULLY SIGNUP ,PLEASE LOGIN NOW" },
          200
        );
      }
    } catch (error) {
      return c.json({ error: "Unable to Signup now" }, 500);
    }
  }

  async signIn(c: Context) {
    try {
      const userData = await c.req.json();
      const signinDataFromDb = await UserDataQuires.signinDetailsCheck(
        userData.email
      );
      console.log("test", signinDataFromDb);
      if (!signinDataFromDb) {
        return c.json({
          error: "Email not found ,Please Signup with Your Details",
        });
      }

      // const hashedPasswordCheck = await bcrypt.compare(
      //   userData.password,
      //   signinDataFromDb[0].password
      // );
      // if (!hashedPasswordCheck) {
      //   return c.json({ error: "Incorrect password" });
      // }

      //GENERATING JWT TOKEN
      const secretKey = process.env.SECRET_KEY;
      if (!secretKey) {
        return c.json({
          error: "SECRET_KEY is missing. Check your .env file.",
        });
      }
      const jwtToken = jwt.sign({ email: userData.email }, secretKey);

      return c.json({ success: "Login Success", jwtToken }, 200);
    } catch (error) {
      return c.json({ error: "Unable to proceed now !!!" }, 500);
    }
  }

  async dashBoard(c: Context) {
    try {
      return c.json({ success: "Welcome to dashboard" });
    } catch (error) {
      return c.json({ error: "failed to get dashboard" });
    }
  }

  async forgetPassword(c: Context) {
    const userData = await c.req.json();
    try {
      const userEmailExistCheck = await UserDataQuires.signinDetailsCheck(
        userData.email
      );

      if (userEmailExistCheck.length === 0) {
        return c.json({ error: "User Not found, Please Create Account" }, 400);
      }

      const token = crypto.randomBytes(32).toString("hex");
      const expireTime = new Date(Date.now() + 3600000);

      await UserDataQuires.passwordChangeTokenStore(
        userData.email,
        token,
        expireTime
      );

      await sendEmailToResetPassword(token, userData.email);

      return c.json({
        success: "Check Mail",
        token,
      });
    } catch (error) {
      return c.json({ error: "Unable to proceed now" });
    }
  }

  async resetPassword(c: Context) {
    try {
      const userData = await c.req.json();

      const get_token_from_db = await UserDataQuires.getTokenFromPassDb(
        userData.email
      );

      if (get_token_from_db.length === 0) {
        return c.json({ error: "Token Not found" });
      }

      if (get_token_from_db[0].token !== userData.token) {
        return c.json({ error: "Token is not matching ,please try again" });
      }

      const saltRound = 10;
      const newHashPassword = await bcrypt.hash(
        userData.newPassword,
        saltRound
      );

      await UserDataQuires.updatePassword(userData.email, newHashPassword);
      await UserDataQuires.deleteToken(userData.email);

      return c.json({
        success: "Password updated , Login with YOur new password",
      });
    } catch (error) {
      return c.json(
        { error: "Something went wrong while resetting password" },
        500
      );
    }
  }
}

export const UserDataControllers = new UserDataController();
