function AuthMiddleware(roles = []) {
    return (req, res, next) => {
        const rol = req.headers["x-rol"];
        if(!rol) {
            return res.status(401).json({error: "Falta el header x-rol"})
        }

        if(!roles.includes(rol)) {
            return res.status(403).json({error: "Acceso denegado"})
        }

        next();
    }
}

module.exports = AuthMiddleware;