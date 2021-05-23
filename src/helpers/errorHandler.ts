export class ServerError extends Error {
    code: Number;
    message: string;
    constructor(code, message) {
        super();

        this.code = code || 500;
        this.message = message || 'Error';
    }
}

export class ValidationError extends Error {
    code: Number;
    message: string;
    constructor(code, message) {
        super();

        this.code = code || 500;
        this.message = message || 'Error';
    }
}

export const handleHttpError = (err, res) => {
    const { code, message } = err;

    res.status(code || 500).json({
        message,
    });
};

export default { ServerError, handleHttpError };
