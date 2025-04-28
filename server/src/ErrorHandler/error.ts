class ErrorHandler extends Error {
	status: number;
	constructor(message: string, status = 500) {
		super(message);
		this.status = status;
		Error.captureStackTrace(this, this.constructor);
	}
}

export default ErrorHandler;
