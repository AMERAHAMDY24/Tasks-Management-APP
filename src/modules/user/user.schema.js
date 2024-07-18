import Joi from "joi";



  // signup Schema.
  export const signUpSchema={
    body:Joi.object({
        name:Joi.string().required(),

    email:Joi.string().email().trim().required(),
    password:Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&])[A-Za-z\d$!%*?&]{8,}$/)
    .messages({
        "string.pattern.base":
        "Password must have at least one lowercase letter, one uppercase letter, one number and one special character",
      "any.required": "You need to provide a password",
      "string.min": "Password should have a minimum length of 3 characters"}),   
     })}
    


  // signin Schema.
  export const signInSchema={
    body:Joi.object({
    email:Joi.string().email().trim(),
    password:Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&])[A-Za-z\d$!%*?&]{8,}$/),
    })}
    