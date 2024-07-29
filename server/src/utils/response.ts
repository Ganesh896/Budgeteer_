export class ApiResponse {
    data: string;
    message: string;
    status: boolean;
    constructor(statusCode: number, data?: any, message = "Success") {
        this.status = statusCode < 400;
        this.message = message;
        this.data = data;
    }
}
