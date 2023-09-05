import {  NextFunction, Request, Response} from "express";
import { ExceptionError, jsonResponse } from "../libs";
import * as Validation from "../validations";

const exceptions: ExceptionError = new ExceptionError();
const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const value = Validation.userSchema.validate(req.body);
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
        const value = Validation.blogSchema.validate(req.body);
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

export { userMiddleware, blogMiddleware };