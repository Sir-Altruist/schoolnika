import { User, Blog } from "@models/index";

export const create = async (payload): Promise<object> => {
    return await User.create(payload);
};

export const findByEmail = async (email: string): Promise<object> => {
    return await User.findOne({
        where: { email }
    });
};

export const findOne = async (id: number): Promise<object> => {
    return await User.findOne({
        where: {id},
        include: [
            {
                model: Blog,
                order: [["id", "DESC"]],
                separate: true
            }
        ]
    });
};

export const findAll = async (): Promise<object> => {
    return await User.findAll();
};