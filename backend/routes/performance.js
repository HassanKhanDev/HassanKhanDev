import express from 'express';
import { protect, hrOrAdmin } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);

router.get('/my-goals', (req, res) => res.json({ success: true, message: 'My goals - To be implemented' }));
router.post('/goals', (req, res) => res.json({ success: true, message: 'Create goal - To be implemented' }));
router.get('/reviews', hrOrAdmin, (req, res) => res.json({ success: true, message: 'Performance reviews - To be implemented' }));
router.post('/feedback', (req, res) => res.json({ success: true, message: 'Submit feedback - To be implemented' }));

export default router;