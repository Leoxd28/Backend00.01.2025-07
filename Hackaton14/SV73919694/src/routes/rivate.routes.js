import { Router } from "express";
import { requireAuthSession } from "../middleware/authSession.js";
import { requireAuthJwt } from "../middleware/authJwt.js";
import { requireRole } from "../middleware/requireRole.js";


export const privateRouter = Router();

privateRouter.get('/profile', requireAuthSession, (req, res) => {
    res.json({me: req.user})
})

privateRouter.get('/jwt/me', requireAuthJwt, (req, res) => {
    res.json({me: req.user})
})

privateRouter.get('/admin/stats', requireAuthJwt, requireRole('admin'), (req, res) => {
    res.json({users: 2, uptime: process.uptime()})
})