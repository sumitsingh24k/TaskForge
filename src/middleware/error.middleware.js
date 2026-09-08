const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
};

const errorHandler = (err, req, res, next) => {
    // duplicate key (email already exists)
    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Email already exists"
        });
    }

    // invalid ObjectId / bad type in a query
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: `Invalid ${err.path}: ${err.value}`
        });
    }

    // mongoose schema validation
    if (err.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: Object.values(err.errors).map(e => e.message)
        });
    }

    const statusCode = err.statusCode || 500;

    // sirf unexpected errors log karo, expected 4xx nahi
    if (statusCode >= 500) {
        console.error(err);
    }

    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

module.exports = { notFound, errorHandler };
