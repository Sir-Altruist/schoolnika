import { Request, Response } from "express";
import { ExceptionError, jsonResponse } from "@libs/index";
import { Blog } from "@services/index";
import { ErrorResponse } from "@interfaces/index";


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
                message: "Successfully created blog post",
                details: blog 
            }
        });
    } catch (error) {
        return exceptions.InternalServerError(error.message);
    }
};

export default createBlogPost;
