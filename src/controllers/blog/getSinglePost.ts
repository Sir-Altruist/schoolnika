import { Request, Response } from "express";
import { ExceptionError, jsonResponse } from "../../libs";
import { Blog } from "../../services";
import { ErrorResponse } from "../../interfaces";


const exceptions: ExceptionError = new ExceptionError();
const fetchSinglePost = async (
    req: Request,
    res: Response
): Promise<Response | ErrorResponse> => {
    try {
        const { id } = req.params;

        const blog = await Blog.findPost(Number(id));
        return jsonResponse(res, {
            statusCode: 200,
            data: blog
        });
    } catch (error) {
        return exceptions.InternalServerError(error.message);
    }
};

export default fetchSinglePost;
