export class ApiError {
    constructor(
        statusCode,
        message = "something went wrong",
        errors = [],
        stack = ""
    ) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = null;
        this.errors = errors;
        this.success = false;
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