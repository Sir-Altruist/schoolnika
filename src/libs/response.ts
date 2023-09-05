import { Response } from "express";

export const jsonResponse = (
    res: Response,
    r: { statusCode: number; data: object | string }
) => {
    return res.status(r.statusCode).json(r.data);
};
