import { db } from "../config/db.js";

export const createPackage = (req, res) => {
  const { sender_id, receiver_name, description } = req.body;
  const sql = "INSERT INTO packages (sender_id, receiver_name, description) VALUES (?, ?, ?)";
  db.query(sql, [sender_id, receiver_name, description], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al crear paquete" });
    }
    res.json({ message: "Paquete creado correctamente" });
  });
};

export const updatePackage = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sql = "UPDATE packages SET status = ? WHERE id = ?";
  db.query(sql, [status, id], (err) => {
    if (err) return res.status(500).json({ error: "Error al actualizar paquete" });
    res.json({ message: "Estado actualizado" });
  });
};

export const getPackages = (req, res) => {
  db.query("SELECT * FROM packages", (err, rows) => {
    if (err) return res.status(500).json({ error: "Error al obtener paquetes" });
    res.json(rows);
  });
};
