const authenticateToken = (req, res, next) => {
  const token = req.headers["token"];
  if (!token) {
    res.status(401).json({ error: "Token no proporcionado" });
  }
  if (token === "teacher123") {
    req.user = { role: "teacher" };
    next();
  } else if (token === "student123") {
    req.user = { role: "student" };
    next();
  } else {
    res.status(401).json({ error: "Token inválido" });
  }
};
module.exports = authenticateToken;