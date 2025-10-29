
export const requireRole = (...roles) => (req, _res, next) => {
    const actor = req.user || req.session?.user;
    

    console.log(actor);

    if(!actor || !roles.includes(actor.role)) return next(Object.assign(new Error('Forbidden'), {status: 403}));
    return next();
} 