export class ApiError extends Error {
    constructor(status,message) {
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