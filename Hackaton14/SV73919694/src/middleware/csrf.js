import csrf from "csurf";

export const csrfProteccion = csrf({
  cookie: false,
  value: (req) => req.headers["x-csrf-token"],
  ignoreMethods: ["GET", "HEAD", "OPTIONS"],
});

export function attachCsrfToken(req, res, next) {
  try {
    const token = req.csrfToken?.();
    if (token) res.set("x-csrf-token", token);
  } catch (error) {}

  next();
}
