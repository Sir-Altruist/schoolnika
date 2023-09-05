import { Request, Response } from "express";
import { Blog } from "@services/index";
import { ExceptionError, jsonResponse } from "@libs/index";
import { ErrorResponse } from "@interfaces/index";

const exceptions: ExceptionError = new ExceptionError();
const fetchAllPosts = async (
    req: Request,
    res: Response
): Promise<Response | ErrorResponse> => {
    try {
        const { limit, skip } = req.query;
        const attributes = {
            exclude: ["updatedAt", "createdAt"]
        };
        const query = {
            offset: skip ? Number(skip) : 0, //get actual skip from query params
            limit: limit ? Number(limit) : 10, // get actual limit from query params
            attributes,
            order: [["id", "DESC"]], // sort data in descending order using id
            separate: true
        };

        const blogs = await Blog.findAllPosts(query);
        return jsonResponse(res, {
            statusCode: 200,
            data: blogs
        });
    } catch (error) {
        return exceptions.InternalServerError(error.message);
    }
};

export default fetchAllPosts;
