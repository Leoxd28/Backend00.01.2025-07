/**
 * @openapi
 * /api/v1/uploads/avatar:
 *   post:
 *     summary: Sube avatar (imagen <=2MB)
 */
import { Router } from 'express';
import { uploadImage } from '../../middlewares/multer.js';
import { uploadAvatar } from '../../controllers/uploads.controller.js';
const r = Router();
r.post('/avatar', uploadImage.single('avatar'), uploadAvatar);
export default r;
