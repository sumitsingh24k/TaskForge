const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
};

const errorHandler = (err, req, res, next) => {
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

    console.error(err);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal server error"
    });
};

module.exports = { notFound, errorHandler };
