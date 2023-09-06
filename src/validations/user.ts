import Joi from "joi";

const PASSWORD_REGEX = new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$");
const userRegistrationSchema: Joi.ObjectSchema = Joi.object({
    username: Joi.string().min(3).label("Username is required and not less than three characters").required(),
    email: Joi.string().label("Invalid email address").email({ minDomainSegments: 2, tlds: { allow: ["com"] } }).required(),
    password: Joi.string().min(8).label("Invalid password").pattern(PASSWORD_REGEX).required(),
    confirm: Joi.ref("password")
});

const userLoginSchema: Joi.ObjectSchema = Joi.object({
    email: Joi.string().label("Invalid email address").email({ minDomainSegments: 2, tlds: { allow: ["com"] } }).required(),
    password: Joi.string().min(8).label("Invalid password").pattern(PASSWORD_REGEX).required(),
});


export { userLoginSchema, userRegistrationSchema };

