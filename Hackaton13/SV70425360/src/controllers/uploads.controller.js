import fs from 'fs';
import path from 'path';
import { env } from '../config/env.js';
export function uploadAvatar(req, res, next) {
  if (!req.file) return next(new Error('Archivo requerido'));
  const file = req.file;
  res.json({ ok: true, file: { name: file.filename, size: file.size, mime: file.mimetype, url: `/${env.UPLOAD_DIR}/${file.filename}` } });
}
