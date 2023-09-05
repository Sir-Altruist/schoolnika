import { ErrorResponse } from "../interfaces";

class ExceptionError {
    public response: ErrorResponse;

    NotFoundError(message: string): ErrorResponse {
        this.response = {
            code: 404,
            message
        };
        return this.response;
    }

    UnauthorizedError(message: string): ErrorResponse {
        this.response = {
            code: 401,
            message
        };
        return this.response;
    }

    InternalServerError(message: string): ErrorResponse {
        this.response = {
            code: 500,
            message
        };
        return this.response;
    }
}

export default ExceptionError;
