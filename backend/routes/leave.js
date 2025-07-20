import express from 'express';
import { protect, hrOrAdmin } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);

router.post('/', (req, res) => res.json({ success: true, message: 'Apply leave - To be implemented' }));
router.get('/my-leaves', (req, res) => res.json({ success: true, message: 'My leaves - To be implemented' }));
router.get('/pending-approvals', hrOrAdmin, (req, res) => res.json({ success: true, message: 'Pending approvals - To be implemented' }));
router.put('/:id/approve', hrOrAdmin, (req, res) => res.json({ success: true, message: 'Approve leave - To be implemented' }));
router.put('/:id/reject', hrOrAdmin, (req, res) => res.json({ success: true, message: 'Reject leave - To be implemented' }));

export default router;