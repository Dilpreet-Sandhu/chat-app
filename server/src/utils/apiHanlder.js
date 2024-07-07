export class ApiError extends Error {
    constructor(status,message) {
        super();
        this.status = status;
        this.message = message || this.message;
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
    httpOnly : true,
    secure:true
}