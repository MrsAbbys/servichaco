import { Router } from 'express';
import { getRoutes, getRouteById } from '../controllers/mobilityController.js';

const router = Router();

router.get('/routes', getRoutes);
router.get('/routes/:id', getRouteById);

export default router;
