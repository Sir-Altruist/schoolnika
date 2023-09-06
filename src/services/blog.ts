import { Blog } from "../repositories";
import { ExceptionError } from "../libs";
import { cache } from "../datasources";
import { ErrorResponse } from "../interfaces";

const exceptions: ExceptionError = new ExceptionError();
export const addPost = async (
    id: number,
    payload: object
): Promise<object | ErrorResponse> => {
    if(!id || typeof id !== "number"){
        return exceptions.UnauthorizedError("Invalid user id");
    }

    //remove post from cache
    await cache.del("posts");
    //create blog post
    return await Blog.create(payload);
};

export const findPost = async (id: number): Promise<object | ErrorResponse> => {
    // checks and get post from cache
    let cachedData = JSON.parse(await cache.get(`post:${id}`));

    if (!cachedData || cachedData === null) {
        const post = await Blog.find(id);
        if (!post || post === null)
            return exceptions.NotFoundError("Blog post not found!");

        // add post to cache
        await cache.set(`post:${id}`, JSON.stringify(post), {
            EX: 3600 // expires in 1hr
        });
        cachedData = post;
    }

    return cachedData;
};

export const findAllPosts = async (query?: {
  offset: number;
  limit: number;
}): Promise<{ rows: object[]; count: number }> => {
    let cachedData: { rows: object[]; count: number } = JSON.parse(
        await cache.get("posts")
    );
    if (!cachedData || cachedData?.count === 0) {
        const posts = await Blog.findAll(query);
        await cache.set(`post?skip${query.offset}&limit=${query.limit}`, JSON.stringify(posts), {
            EX: 3600 // expires in 1hr
        });
        cachedData = posts;
    }
    return cachedData;
};

export const updatePost = async (
    id: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any
): Promise<object | ErrorResponse> => {
    // checks and get post from redis cache
    let cachedData = JSON.parse(await cache.get(`post:${id}`));
    if (!cachedData || cachedData === null) {
        const post = await Blog.find(id);
        if (!post || post === null)
            return exceptions.NotFoundError("Blog post not found");
    }
    const updatedPost = await Blog.update(id, payload);
    // set post value to cache
    await cache.set(`post:${id}`, JSON.stringify(updatedPost[1][0]), {
        EX: 3600 // expires in 1hr
    });
    cachedData = updatedPost[1][0];
    return cachedData;
};

export const deletePost = async (
    id: number
): Promise<number | ErrorResponse> => {
    if(!id || typeof id !== "number"){
        return exceptions.UnauthorizedError("Invalid user id");
    }
    const post = await Blog.find(id);
    if (!post || post === null)
        return exceptions.NotFoundError("Post not found");

    await cache.del(`post:${id}`);
    await cache.del("posts");
    return await Blog.remove(id);
};
