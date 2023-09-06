import {  NextFunction, Request, Response} from "express";
import { ExceptionError, jsonResponse } from "../libs";
import { UserSchema, BlogSchema } from "../validations";

const { userLoginSchema, userRegistrationSchema } = UserSchema;

const exceptions: ExceptionError = new ExceptionError();
const userRegistrationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const value = userRegistrationSchema.validate(req.body);
        if(value.error){
            return jsonResponse(res, {
                statusCode: 400,
                data: {
                    message: value.error.details[0].context.label === "confirm" ? "Passwords do not match" : value.error.details[0].context.label
                }
            });
        } else {
            next();
        }
    } catch (error) {
        return exceptions.UnauthorizedError(error.message);
    }   
};

const userLoginMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const value = userLoginSchema.validate(req.body);
        if(value.error){
            return jsonResponse(res, {
                statusCode: 400,
                data: {
                    message: value.error.details[0].context.label === "confirm" ? "Passwords do not match" : value.error.details[0].context.label
                }
            });
        } else {
            next();
        }
    } catch (error) {
        return exceptions.UnauthorizedError(error.message);
    }   
};

const blogMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const value = BlogSchema.validate(req.body);
        if(value.error){
            return jsonResponse(res, {
                statusCode: 400,
                data: {
                    message: value.error.details[0].context.label
                }
            });
        } else {
            next();
        }
    } catch (error) {
        return exceptions.UnauthorizedError(error.message);
    }   
};

export { userRegistrationMiddleware, userLoginMiddleware, blogMiddleware };