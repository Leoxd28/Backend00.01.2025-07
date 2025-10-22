module.exports = function conditionalLogger(req, res, next) {
  if (["POST", "PUT"].includes(req.method)) {
    console.log("[conditionalLogger]", req.method, req.originalUrl);
  }
  next();
};
