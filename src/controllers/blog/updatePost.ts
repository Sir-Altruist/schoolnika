import { Request, Response } from "express";
import { ExceptionError, jsonResponse } from "@libs/index";
import { Blog } from "@services/index";
import { ErrorResponse } from "@interfaces/index";


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
                message: "Successfully updated blog post",
                blog
            }
        });
    } catch (error) {
        return exceptions.InternalServerError(error.message);
    }
};

export default updateBlogPost;
