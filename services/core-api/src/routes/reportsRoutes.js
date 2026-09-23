import { Router } from 'express';
import { getPublicReports, createReport } from '../controllers/reportsController.js';

const router = Router();

router.get('/', getPublicReports);
router.post('/', createReport);

export default router;
