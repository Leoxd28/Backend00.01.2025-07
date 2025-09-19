
//-----------------------------------------------
// Hora 3 – Middleware y autenticación
//-----------------------------------------------
// Middleware de autenticación y roles
const auth = (req, res, next) => {
    const token = req.headers['token'];
    if (!token) {
        return res.status(401).json({ message: 'Token requerido' });
    }
    if (token === "teacher123") {
        req.user = { role: "teacher" };
        next();
    } else if (token === "student123") {
        req.user = { role: "student" };
        next();
    } else {
        return res.status(403).json({ message: 'Token inválido' });
    }
};

module.exports = auth;

