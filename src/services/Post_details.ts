import { db } from "../config/db";
import { eq } from "drizzle-orm";
import { PasswordRejecttoken, usersData } from "../models/usersData";
class userDataQueires {
  async Exist_check(email: string) {
    return await db
      .select()
      .from(usersData)
      .where(eq(usersData.email, email))
      .execute();
  }

  async Put_query(email: string, password: any) {
    return await db
      .insert(usersData)
      .values({ email: email, password: password })
      .execute();
  }

  async Login_Put_query(e: string) {
    return await db
      .select()
      .from(usersData)
      .where(eq(usersData.email, e))
      .execute();
  }

  async tokenStore(email: string, token: string, expireTime: any) {
    return await db
      .insert(PasswordRejecttoken)
      .values({ email: email, token: token, expires_date: expireTime })
      .execute();
  }

  async Get_token(e: any) {
    return await db
      .select()
      .from(PasswordRejecttoken)
      .where(eq(PasswordRejecttoken.email, e))
      .execute();
  }

  async Exist_check_fortoken(e: any) {
    return await db
      .select()
      .from(PasswordRejecttoken)
      .where(eq(PasswordRejecttoken.email, e))
      .execute();
  }

  async PasswordCheck(e: any) {
    return await db
      .select()
      .from(usersData)
      .where(eq(usersData.password, e))
      .execute();
  }

  async Update_password(newPassword: any, e: any) {
    return await db
      .update(usersData)
      .set({ password: newPassword })
      .where(eq(usersData.email, e));
  }

  async Delete_token(email: any) {
    return await db
      .delete(PasswordRejecttoken)
      .where(eq(PasswordRejecttoken.email, email));
  }
}

export const UserDataQueires = new userDataQueires();
