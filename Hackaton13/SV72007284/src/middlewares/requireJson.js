module.exports = function requireJson(req, res, next) {
  if (["GET", "DELETE"].includes(req.method)) return next();
  const type = req.headers["content-type"] || "";
  if (
    !type.includes("application/json") &&
    req.method !== "GET" &&
    !req.is("multipart/form-data")
  ) {
    return res
      .status(415)
      .json({ error: "Content-Type must be application/json" });
  }
  next();
};
