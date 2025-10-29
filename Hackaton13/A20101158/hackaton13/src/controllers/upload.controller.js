const path = require('path');
const fs = require('fs');

exports.uploadFile = (req, res, next) => {
  if (!req.file) return res.status(400).json({ error: 'No se envió ningún archivo.' });
  res.json({ message: 'Archivo subido correctamente', filename: req.file.filename });
};

exports.downloadFile = (req, res, next) => {
  const filePath = path.join(__dirname, '../../uploads', req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Archivo no encontrado' });
  res.download(filePath);
};
