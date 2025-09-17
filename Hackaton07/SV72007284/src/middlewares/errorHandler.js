function errorHandler(err, req, res, next) {
    console.log("Error capturado: ", err);
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message || "Error interno del servidor",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
}
module.exports = errorHandler;