import passport from "passport";

export const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

export const googleCallback = passport.authenticate("google", {
  successRedirect: "/",
  failureRedirect: "/auth/fail"
});

export const logout = (req, res) => {
  req.logout(() => res.redirect("/"));
};
