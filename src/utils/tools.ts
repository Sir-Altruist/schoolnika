/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "@config/index";
import { ExceptionError } from "@libs/index";
import bcrypt from "bcryptjs";


const exceptions: ExceptionError = new ExceptionError();

export async function comparePassword(plainPassword: string, hashedPassword: string){
    return await bcrypt.compare(plainPassword, hashedPassword);
}
export function generateToken(id: number){
    try {
        return jwt.sign(
            {id},
            env.SECRET_KEY,
            {expiresIn: 3600}
        );
    } catch (error) {
        return exceptions.UnauthorizedError(error.message);
    }
}

export function checkToken(req: JwtPayload){
    if(req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer"){
        return req.headers.authorization.split(" ")[1];
    }
    return null;
}

export function verifyToken(token: string){
    jwt.verify(token, env.SECRET_KEY);
}
