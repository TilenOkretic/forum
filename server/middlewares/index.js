const {
    verify
} = require('../auth/utils');

const error_types = {
    ValidationError: 422,
    UniqueViolationError: 409
}

const error_message = {
    UniqueViolationError: "Already exists."
}

async function checkAuthHeaderSetUser(req, res, next) {
    const authrization = req.get('authorization');
    if (authrization) {
        const token = authrization.split(' ')[1];
        try {
            const usr = await verify(token);
            req.user = usr;
            console.log(usr);
        } catch (error) {
            console.error(error);

        }
    }
    next();
}

async function checkAuthHeaderSetUserUnAuthorized(req, res, next) {
    const authrization = req.get('authorization');
    if (authrization) {
        const token = authrization.split(' ')[1];
        try {
            const usr = await verify(token);
            req.user = usr;
            return next();
        } catch (error) {
            console.error(error);
        }
    }
    res.status(401);
    next(new Error('Un-Authorized'));
}

function notFound(req, res, next) {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

function errorHandler(error, req, res, next) {
    const status_code = res.statusCode === 200 ? (error_types[error.name] || 500) : res.statusCode;
    res.status(status_code);
    res.json({
        status: status_code,
        message: error_message[error.name] || error.message,
        stack: process.env.NODE_ENV === 'production' ? "production stack :P" : error.stack,
        errors: error.errors || undefined,
    });
}

module.exports = {
    notFound,
    errorHandler,
    checkAuthHeaderSetUser,
    checkAuthHeaderSetUserUnAuthorized
};