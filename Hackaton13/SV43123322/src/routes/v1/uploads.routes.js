const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// Crear directorio uploads si no existe
const uploadsDir = path.join(__dirname, '../../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuración de almacenamiento (igual que Semana13Sesion01)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Generar nombre único sin extensión (como en Semana13Sesion01)
    const uniqueName = crypto.randomBytes(16).toString('hex');
    cb(null, uniqueName);
  }
});

// Filtro para solo imágenes
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos de imagen'), false);
  }
};

// Configurar multer con límite de 2MB
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  },
  fileFilter: fileFilter
});

// POST /api/v1/uploads/avatar - Subir avatar
router.post('/avatar', upload.single('avatar'), (req, res) => {
  /* 
    #swagger.tags = ['Uploads']
    #swagger.summary = 'Subir avatar de usuario'
    #swagger.description = 'Sube una imagen de avatar (máximo 2MB, solo imágenes)'
    #swagger.consumes = ['multipart/form-data']
    #swagger.parameters['avatar'] = {
      in: 'formData',
      type: 'file',
      required: true,
      description: 'Archivo de imagen (jpg, png, gif)'
    }
    #swagger.responses[200] = {
      description: 'Avatar subido exitosamente',
      schema: {
        message: 'Avatar subido exitosamente',
        filename: 'abc123def456',
        originalname: 'avatar.jpg',
        size: 1024000,
        mimetype: 'image/jpeg'
      }
    }
    #swagger.responses[400] = {
      description: 'Archivo inválido o tamaño excedido'
    }
  */
  
  if (!req.file) {
    return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
  }

  res.json({
    message: 'Avatar subido exitosamente',
    filename: req.file.filename,
    originalname: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
    path: req.file.path
  });
});

// Manejo de errores de multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'El archivo excede el tamaño máximo de 2MB' });
    }
    return res.status(400).json({ error: error.message });
  } else if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
});

module.exports = router;