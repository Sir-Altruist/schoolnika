import { Request, Response } from "express";
import { ExceptionError, jsonResponse } from "../../libs";
import { Blog } from "../../services";
import { ErrorResponse } from "../../interfaces";


const exceptions: ExceptionError = new ExceptionError();
const deleteBlogPost = async (
    req: Request,
    res: Response
): Promise<Response | ErrorResponse> => {
    try {
        const { id } = req.params;

        const post = await Blog.deletePost(Number(id));
        return jsonResponse(res, {
            statusCode: 200,
            data: {
                details: post === 1 ? "Successfully deleted post" : post
            }
        });
    } catch (error) {
        return exceptions.InternalServerError(error.message);
    }
};

export default deleteBlogPost;
