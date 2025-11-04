import express from "express";
import http from "http";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { db } from "./config/db.js";
import "./config/passport.js";
import authRoutes from "./routes/auth.routes.js";
import packageRoutes from "./routes/package.routes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static("public"));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


app.use("/auth", authRoutes);
app.use("/packages", packageRoutes);


io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("updatePackage", (data) => {
    const { packageId, status, latitude, longitude } = data;

    
    const sql1 = "UPDATE packages SET status = ? WHERE id = ?";
    db.query(sql1, [status, packageId], (err) => {
      if (err) console.error("Error al actualizar paquete:", err);
    });

    
    const sql2 = "INSERT INTO package_locations (package_id, latitude, longitude) VALUES (?, ?, ?)";
    db.query(sql2, [packageId, latitude, longitude], (err) => {
      if (err) console.error("Error al insertar ubicación:", err);
    });

    
    io.emit("packageUpdated", data);
  });

  socket.on("disconnect", () => console.log("Cliente desconectado"));
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
