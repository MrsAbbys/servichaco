import { Router } from 'express';
import { getPublicReports, createReport, updateReportStatus } from '../controllers/reportsController.js';

const router = Router();

router.get('/', getPublicReports);
router.post('/', createReport);
router.patch('/:id/status', updateReportStatus);

export default router;
