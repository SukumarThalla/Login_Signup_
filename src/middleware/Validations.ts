const Email_validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const Password_validation =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const validationCheck = async (c: any, next: any) => {
  try {
    const { email, password } = await c.req.json();
    if (!email || !password) {
      return c.json({ error: "PLEASE ENTER THE CREDENTIALS PROPERLY(M)" }, 400);
    }

    if (!Email_validation.test(email)) {
      return c.json(
        {
          error: "Please Enter a valid email address",
        },
        400
      );
    }

    if (password && !Password_validation.test(password)) {
      return c.json({
        error: "Please Choose a Strong Password",
      });
    }
    await next();
  } catch (error) {
    return c.json({ error: "Invalid request body" }, 400);
  }
};

export const newPasswordValidation = async (c: any, next: any) => {
  const { newPassword } = await c.req.json();
  if (!newPassword) {
    return c.json({ error: "Please enter your New Password" });
  }

  if (!Password_validation.test(newPassword)) {
    return c.json(
      {
        error: "Please Choose a Strong Password",
      },
      400
    );
  }
  await next();
};
