class ApiError extends Error {
  constructor(message, statusCode, status) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = status || 'Error';

    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = ApiError;
