export class ApiError extends Error {
    statusCode: number;
    data: any;
    success: boolean;
    errors: any;

    constructor(statusCode: number, message = "Something went wrong", errors?: any, stack = "") {
        super(message);
        this.statusCode = statusCode || 500;
        this.data = null;
        this.success = false;
        this.errors = errors;
    }
}
