export class ApiError extends Error {
    constructor(
        statusCode,
        message = "something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.errors = errors;
        this.success = false;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export class ApiResponse {
    constructor(status,data,message) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
}

export const cookieOptions = {
    httponly : true,
    secure:true
}