import { Router } from 'express';
import { getPublicServices, getBusinessesDirectory } from '../controllers/servicesController.js';

const router = Router();

router.get('/public', getPublicServices);
router.get('/directory', getBusinessesDirectory);

export default router;
