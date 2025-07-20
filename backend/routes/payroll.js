import express from 'express';
import { protect, hrOrAdmin } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);

router.get('/my-payslips', (req, res) => res.json({ success: true, message: 'My payslips - To be implemented' }));
router.post('/generate-payroll', hrOrAdmin, (req, res) => res.json({ success: true, message: 'Generate payroll - To be implemented' }));
router.get('/analytics', hrOrAdmin, (req, res) => res.json({ success: true, message: 'Payroll analytics - To be implemented' }));

export default router;