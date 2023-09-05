import { User } from "@repositories/index";
import { ExceptionError } from "@libs/index";
import { ErrorResponse, ResponseType, UserRequestBody } from "@interfaces/index";
import { Tools } from "@utils/index";




const exceptions: ExceptionError = new ExceptionError();
export const register = async (
    payload: UserRequestBody
): Promise<object | ErrorResponse> => {
    const { email } = payload;
    const user = await User.findByEmail(email);
    if (user)
        return exceptions.UnauthorizedError("User with email already exists");

    const newUser = await User.create(payload);
    return newUser;
};

export const login = async (payload: UserRequestBody): Promise<object | ErrorResponse> => {
    const { email, password } = payload;
    const user: ResponseType = await User.findByEmail(email);
    if (!user || user === null)
        return exceptions.NotFoundError("User does not exist");

    // Compare passwords
    const validPassword = await Tools.comparePassword(password, user.dataValues.password);

    if(!validPassword){
        return exceptions.UnauthorizedError("Password is not correct");
    }

    const token = Tools.generateToken(user.dataValues.id);
    return { token, user };

};

export const findUser = async (payload): Promise<object | ErrorResponse> => {
    return await User.findOne(payload);
};

export const findAlUsers = async (): Promise<object> => {
    return await User.findAll();
};
