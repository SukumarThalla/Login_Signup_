import { db } from "../db/dbConnection";
import { eq, desc } from "drizzle-orm";
import { PasswordRejectToken, usersData } from "../db/schemes/usersData";
class UserDataQuire {
  async accountExistCheck(email: string) {
    return await db
      .select()
      .from(usersData)
      .where(eq(usersData.email, email))
      .execute();
  }

  async signinDetailsCheck(email: string) {
    return await db
      .select()
      .from(usersData)
      .where(eq(usersData.email, email))
      .execute();
  }

  async passwordChangeTokenStore(
    email: string,
    token: string,
    expiresDate: any
  ) {
    return await db
      .insert(PasswordRejectToken)
      .values({
        email: email,
        expires_date: expiresDate,
        token: token,
      })
      .execute();
  }

  async storingNewAccountDetails(email: string, password: any) {
    return await db
      .insert(usersData)
      .values({ email: email, password: password })
      .execute();
  }

  async getTokenFromPassDb(e: any) {
    return await db
      .select()
      .from(PasswordRejectToken)
      .where(eq(PasswordRejectToken.email, e))
      .orderBy(desc(PasswordRejectToken.Id))
      .limit(1)
      .execute();
  }

  async existUserCheckForNewPassword(email: any) {
    return await db
      .select()
      .from(PasswordRejectToken)
      .where(eq(PasswordRejectToken.email, email))
      .execute();
  }

  async PasswordCheck(e: any) {
    return await db
      .select()
      .from(usersData)
      .where(eq(usersData.password, e))
      .execute();
  }

  async updatePassword(email: string, newHashPassword: string) {
    return await db
      .update(usersData)
      .set({ password: newHashPassword })
      .where(eq(usersData.email, email));
  }

  async deleteToken(email: any) {
    return await db
      .delete(PasswordRejectToken)
      .where(eq(PasswordRejectToken.email, email));
  }
}

export const UserDataQuires = new UserDataQuire();
