const checkRole = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ error: 'No se pudo determinar el rol del usuario.' });
        }
        if (!roles.includes(req.user.role)) {
            console.log(`Acceso denegado: El rol '${req.user.role}' no tiene permiso para esta acción.`);
            return res.status(403).json({ error: 'Acceso denegado. No tienes los permisos necesarios.' });
        }
        next();
    }
}
module.exports = checkRole;