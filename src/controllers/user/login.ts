import { Request, Response } from "express";
import { ExceptionError, jsonResponse } from "@libs/index";
import { User } from "@services/index";
import { ErrorResponse } from "@interfaces/index";


const exceptions: ExceptionError = new ExceptionError();
const loginUser = async (
    req: Request,
    res: Response
): Promise<Response | ErrorResponse> => {
    try {
        const user = await User.login(req.body);
        return jsonResponse(res, {
            statusCode: 200,
            data: user
        });
    } catch (error) {
        return exceptions.InternalServerError(error.message);
    }
};

export default loginUser;
