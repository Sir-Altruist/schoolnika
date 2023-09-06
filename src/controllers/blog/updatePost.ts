import { Request, Response } from "express";
import { ExceptionError, jsonResponse } from "../../libs";
import { Blog } from "../../services";
import { ErrorResponse } from "../../interfaces";


const exceptions: ExceptionError = new ExceptionError();
const updateBlogPost = async (
    req: Request,
    res: Response
): Promise<Response | ErrorResponse> => {
    try {
        const { id } = req.params;

        const blog = await Blog.updatePost(Number(id), req.body);
        return jsonResponse(res, {
            statusCode: 200,
            data: {
                details: blog
            }
        });
    } catch (error) {
        return exceptions.InternalServerError(error.message);
    }
};

export default updateBlogPost;
