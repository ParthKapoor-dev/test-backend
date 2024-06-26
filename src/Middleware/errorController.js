const errorMiddleware = (err, req, res, next) => {
    res.status(res.locals.statusCode || 500).json({
        reason: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : '🥞'
    });
}

module.exports = errorMiddleware;