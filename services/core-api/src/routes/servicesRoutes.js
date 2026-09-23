import { Router } from 'express';
import { getPublicServices } from '../controllers/servicesController.js';

const router = Router();

// Ruta pública accesible en modo visitante
router.get('/public', getPublicServices);

export default router;
