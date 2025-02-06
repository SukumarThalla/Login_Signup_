import * as v from "valibot";

const validateLoginSchema = v.object({
  email: v.string(),
  password: v.string(),
});
