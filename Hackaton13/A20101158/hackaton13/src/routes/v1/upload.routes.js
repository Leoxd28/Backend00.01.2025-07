const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadFile, downloadFile } = require('../../controllers/upload.controller');
const authToken = require('../../middlewares/authToken');

const router = express.Router();
const upload = multer({
  dest: path.join(__dirname, '../../../uploads'),
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
});

router.post('/', authToken, upload.single('file'), uploadFile);
router.get('/:filename', authToken, downloadFile);

module.exports = router;
