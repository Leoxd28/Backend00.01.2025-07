import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { db } from "./db.js";
import dotenv from "dotenv";
dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
(accessToken, refreshToken, profile, done) => {
  const checkUser = "SELECT * FROM users WHERE oauth_id = ?";
  db.query(checkUser, [profile.id], (err, results) => {
    if (err) return done(err);
    if (results.length === 0) {
      const insertUser = "INSERT INTO users (oauth_id, name, email, provider) VALUES (?, ?, ?, ?)";
      db.query(insertUser, [profile.id, profile.displayName, profile.emails[0].value, "google"], (err2) => {
        if (err2) return done(err2);
        return done(null, profile);
      });
    } else {
      return done(null, profile);
    }
  });
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
