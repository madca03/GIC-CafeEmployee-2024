import AppError from "@/common/errors/AppError";

class AppAPIError extends AppError {
    public status: number;
    public data: any;

    constructor(status: number, message: string, data: any) {
        super(message);
        this.status = status;
        this.data = data;
    }
}

export default AppAPIError;