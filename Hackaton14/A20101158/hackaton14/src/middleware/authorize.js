export function authorize(...allowedRoles) {
  return (req, res, next) => {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "No autenticado" });

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    next();
  };
}
