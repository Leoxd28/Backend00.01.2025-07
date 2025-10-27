import express from "express";
import { findUserByEmail, verifyPassword } from "../services/user.service.js";
import {
  generateTokens,
  rotateRefreshToken,
  revokeRefresh,
} from "../services/token.service.js";
import { verifyRefresh } from "../utils/tokens.js";
import { requireAuthJwt } from "../middleware/authJwt.js";

const router = express.Router();


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return res.status(401).json({
      error: true,
      message: "Credenciales inválidas",
    });
  }

  const { accessToken, refreshToken } = generateTokens(user);

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      error: false,
      message: "Login exitoso",
      data: {
        accessToken,
        refreshToken,
      },
    });
});


router.post("/refresh", (req, res) => {
  const token = req.cookies?.refreshToken || req.body.token;

  if (!token) {
    return res.status(401).json({
      error: true,
      message: "No hay refresh token",
    });
  }

  try {
    const payload = verifyRefresh(token);
    const { accessToken, refreshToken } = rotateRefreshToken(payload.jti, {
      id: payload.sub,
      role: payload.role,
    });

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        error: false,
        message: "Token renovado",
        data: {
          accessToken,
        },
      });
  } catch (err) {
    res.status(403).json({
      error: true,
      message: "Refresh token inválido o revocado",
    });
  }
});


router.post("/logout", (req, res) => {
  const token = req.cookies?.refreshToken;
  if (token) {
    try {
      const payload = verifyRefresh(token);
      revokeRefresh(payload.jti);
    } catch {}
  }
  res
    .clearCookie("refreshToken")
    .status(200)
    .json({ message: "Logout exitoso" });
});


router.get("/me", requireAuthJwt, (req, res) => {
  res.status(200).json({
    error: false,
    message: "Usuario autenticado",
    data: req.user,
  });
});

export default router;
