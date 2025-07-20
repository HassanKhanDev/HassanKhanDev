import express from 'express';
import { protect, hrOrAdmin, adminOnly } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);

router.get('/admin-stats', adminOnly, (req, res) => res.json({ success: true, message: 'Admin dashboard stats - To be implemented' }));
router.get('/hr-stats', hrOrAdmin, (req, res) => res.json({ success: true, message: 'HR dashboard stats - To be implemented' }));
router.get('/employee-stats', (req, res) => res.json({ success: true, message: 'Employee dashboard stats - To be implemented' }));
router.get('/analytics', hrOrAdmin, (req, res) => res.json({ success: true, message: 'Analytics data - To be implemented' }));

export default router;