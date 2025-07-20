import express from 'express';
import { protect, hrOrAdmin } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);

router.get('/announcements', (req, res) => res.json({ success: true, message: 'Get announcements - To be implemented' }));
router.post('/announcements', hrOrAdmin, (req, res) => res.json({ success: true, message: 'Create announcement - To be implemented' }));
router.get('/notifications', (req, res) => res.json({ success: true, message: 'Get notifications - To be implemented' }));
router.put('/notifications/:id/read', (req, res) => res.json({ success: true, message: 'Mark notification as read - To be implemented' }));

export default router;