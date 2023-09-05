/* eslint-disable @typescript-eslint/no-explicit-any */
import { Blog } from "../models";

export const create = async (payload): Promise<object> => {
    return await Blog.create(payload);
};

export const find = async (id: number): Promise<object> => {
    return await Blog.findOne({
        where: { id }
    });
};

export const findAll = async (
    query?: object
): Promise<{ rows: object[]; count: number }> => {
    return await Blog.findAndCountAll(query);
};

export const update = async (
    id: number,
    payload: any
): Promise<string | object> => {
    return await Blog.update(payload, {
        where: { id },
        returning: true
    });
};

export const remove = async (id: number): Promise<number> => {
    return await Blog.destroy({
        where: { id }
    });
};
