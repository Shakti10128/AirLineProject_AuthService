const AppError = require("../utils/error-handler")

const errorResponse = (res, statusCode, message, error = null) => {
    return res.status(statusCode).json({
        data: {},
        success: false,
        message: message,
        err: error instanceof AppError ? error.err : error
    });
};


module.exports = errorResponse;
