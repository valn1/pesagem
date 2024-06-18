abstract interface Exception {
    message: string;
    code: number;
}

export class DatabaseException implements Exception {
    message: string;
    code: number;

    constructor(message: string, code: number = 500) {
        this.message = message;
        this.code = code;
    }
}