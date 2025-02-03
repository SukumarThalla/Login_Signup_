import { error } from "console";
import { UserDataQueires } from "../services/Post_details";
// import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
// @ts-ignore
import sibApiV3Sdk from "sib-api-v3-sdk";
// @ts-ignore

class Usersdatacontroller {
  async loginController(c: any) {
    try {
      const { email, password } = await c.req.json();
      if (!email || !password) {
        return c.json({ error: "PLEASE ENTER THE CREDENTIALS TO lOGIN" });
      }
      const loginData = await UserDataQueires.Login_Put_query(email);
      if (Array.isArray(loginData) && loginData.length === 0) {
        return c.json(
          { success: "Login failure, email not found, Please Signup" },
          404
        );
      }

      if (loginData[0].password !== password) {
        return c.json({ error: "Incorrect password" });
      }

      return c.json({ success: "Login Success" }, 200);
    } catch (error) {
      return c.json({ error: "Unable to procced now" }, 500);
    }
  }

  async SignupController(c: any) {
    try {
      const { email, password } = await c.req.json();
      const existEmailcheck = await UserDataQueires.Exist_check(email);
      if (Array.isArray(existEmailcheck) && existEmailcheck.length > 0) {
        return c.json(
          { error: "Email Already Exists, You Can login Directly" },
          200
        );
      } else {
        const SignupData = await UserDataQueires.Put_query(email, password);
        console.log(SignupData);
        return c.json(
          { success: "SUCCUSSFULLY SIGNUP ,PLEASE LOGIN NOW" },
          200
        );
      }
    } catch (error) {
      return c.json({ error: "Unable to procced now" }, 500);
    }
  }

  async forgetPassword(c: any) {
    const { email } = await c.req.json();
    try {
      const user = await UserDataQueires.Login_Put_query(email);
      if (Array.isArray(user) && user.length === 0) {
        return c.json({ error: "User not Found " }, 400);
      }
      const token = crypto.randomBytes(32).toString("hex");
      const expireTime = new Date(Date.now() + 3600000);

      try {
        const passwordemail = await UserDataQueires.Exist_check_fortoken(email);
        if (Array.isArray(passwordemail) && passwordemail.length === 0) {
          await UserDataQueires.tokenStore(email, token, expireTime);
        }
        try {
          const client = sibApiV3Sdk.ApiClient.instance;
          const apiKey = client.authentications["api-key"];
          apiKey.apiKey = process.env.BREVO_API_KEY;
          const transApi = new sibApiV3Sdk.TransactionalEmailsApi();
          const sender = { email: "sukumar63044@gmail.com", name: "login" };
          console.log("mail sending token", token);
          const receiver = [{ email }];
          await transApi.sendTransacEmail({
            sender,
            to: receiver,
            subject: "Password Reset Request",
            htmlContent: `
              <p>Hi,</p>
              <p>You requested to reset your password. Use this below token below to reset it:</p>
              <p> Your token is <b>${token}</b></p>
              Use http://localhost:3000/reset-password route with this token as json object.
              <p>If you did not request this, please ignore this email.</p>
            `,
          });

          return c.json({ success: "Reset Mail Sent to ", email });
        } catch (error) {
          return c.json({ error: "issue with transaction mail generation" });
        }
      } catch (error) {
        return c.json({ error: "email not exists" });
      }
    } catch (error) {
      return c.json({ error: "Unable to proceed now" });
    }
  }

  async resetPassword(c: any) {
    try {
      const { email, token, newPassword } = await c.req.json();
      if (!token || !newPassword || !email) {
        return c.json({
          error:
            "Please enter the token along with email,Newpassword to create New password",
        });
      }

      const get_token_from_db = await UserDataQueires.Get_token(email);

      if (get_token_from_db[0].token !== token) {
        return c.json({ error: "Token is not matching ,please try again" });
      }

      await UserDataQueires.Update_password(newPassword, email);
      await UserDataQueires.Delete_token(email);

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

export const usersdatacontroller = new Usersdatacontroller();

// const { email, token, newPassword } = await c.req.json();
// if (!token || !newPassword || !email) {
//   return c.json({
//     error:
//       "Please enter the token along with email,Newpassword to create New password",
//   });
// }

// const get_token_from_db = await UserDataQueires.Get_token(email);
// console.log(get_token_from_db);
// if (get_token_from_db[0].token !== token) {
//   return c.json({ error: "Token is not matching ,please try again" });
// }

// await UserDataQueires.Update_password(newPassword, email);
// await UserDataQueires.Delete_token(email);

// return c.json({
//   success: "Password updated , Login with YOur new password",
// });

// } catch (error) {
//   return c.json(
//     { error: "Something went wrong while resetting password" },
//     500
//   );
// }
