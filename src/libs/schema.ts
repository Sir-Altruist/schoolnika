import Joi from "joi";

export const schemaValidator = Joi.object({
    username: Joi
        .string().alphanum().min(3).max(10)
        .message("Username cannot be empty and must be a minimum of 3 characters")
        .required(),
    email: Joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
        .message("Invalid email address")
        .required(),
    password: Joi
        .string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .message("Invalid password")
        .required(),
    confirm: Joi.ref("password"),

}).with("password", "confirm");