import { Logger, jsonResponse } from "@libs/index";
import { Response, Request, NextFunction } from "express";
import { Tools } from "@utils/index";

async function authentication(req: Request, res: Response, next: NextFunction) {
    try {
        const token = Tools.checkToken(req);
        if(!token || token === null){
            return jsonResponse(res, {
                statusCode: 400,
                data: {
                    msg: "No token in Header. Authorization denied!"
                }
            });
        }

        Tools.verifyToken(token);
        next();
    } catch (error) {
        Logger.error(`${error.message}`);
        jsonResponse(res, {
            statusCode: 401,
            data: {
                msg: error.message && "Invalid token or token expired",
                badToken: true
            }
        });
    }
}

export default authentication;
