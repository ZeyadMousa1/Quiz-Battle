import joi from "joi";

export function validateSignUpUser(obj: Object) {
  const schema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    userName: joi.string().lowercase().required(),
    email: joi.string().email().required(),
    password: joi.string().min(7).max(25).required(),
  });
  return schema.validate(obj);
}

export function validateSignInUser(obj: Object) {
  const schema = joi
    .object({
      userName: joi.string().lowercase().required(),
      email: joi.string().email().required(),
      password: joi.string().min(7).max(25).required(),
    })
    .or("userName", "email");
  return schema.validate(obj);
}
