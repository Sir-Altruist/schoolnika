import { Request, Response } from "express";
import { ExceptionError, jsonResponse } from "../../libs";
import { User } from "../../services";
import { ErrorResponse } from "../../interfaces";


const exceptions: ExceptionError = new ExceptionError();
const registerUser = async (
    req: Request,
    res: Response
): Promise<Response | ErrorResponse> => {
    try {
        const user = await User.register(req.body);
        return jsonResponse(res, {
            statusCode: 201,
            data: user
        });
    } catch (error) {
        return exceptions.InternalServerError(error.message);
    }
};

export default registerUser;
