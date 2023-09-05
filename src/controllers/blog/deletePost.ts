import { Request, Response } from "express";
import { ExceptionError, jsonResponse } from "@libs/index";
import { Blog } from "@services/index";
import { ErrorResponse } from "@interfaces/index";


const exceptions: ExceptionError = new ExceptionError();
const deleteBlogPost = async (
    req: Request,
    res: Response
): Promise<Response | ErrorResponse> => {
    try {
        const { id } = req.params;

        await Blog.deletePost(Number(id));
        return jsonResponse(res, {
            statusCode: 200,
            data: {
                message: "Successfully deleted blog post"
            }
        });
    } catch (error) {
        return exceptions.InternalServerError(error.message);
    }
};

export default deleteBlogPost;
