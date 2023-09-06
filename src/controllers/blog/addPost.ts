import { Request, Response } from "express";
import { ExceptionError, jsonResponse } from "../../libs";
import { Blog } from "../../services";
import { ErrorResponse } from "../../interfaces";


const exceptions: ExceptionError = new ExceptionError();
const createBlogPost = async (
    req: Request,
    res: Response
): Promise<Response | ErrorResponse> => {
    try {
        const { id } = req.params;
        const { title, story, tag } = req.body;

        const blogObject = {
            title,
            story,
            tag,
            userId: id
        };

        const blog = await Blog.addPost(Number(id), blogObject);
        return jsonResponse(res, {
            statusCode: 201,
            data: {
                details: blog 
            }
        });
    } catch (error) {
        return exceptions.InternalServerError(error.message);
    }
};

export default createBlogPost;
