function requireRole(...roles) {
  return (req, res, next) => {
    const actor = req.user || req.session?.user;
    if (!actor || !roles.includes(actor.role)) return res.sendStatus(403);
    next();
  };
}

module.exports = { requireRole };