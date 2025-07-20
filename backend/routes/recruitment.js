import express from 'express';
import { protect, recruiterOrAbove } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);

router.get('/jobs', recruiterOrAbove, (req, res) => res.json({ success: true, message: 'Get jobs - To be implemented' }));
router.post('/jobs', recruiterOrAbove, (req, res) => res.json({ success: true, message: 'Create job - To be implemented' }));
router.get('/applications/:jobId', recruiterOrAbove, (req, res) => res.json({ success: true, message: 'Get applications - To be implemented' }));
router.post('/parse-resume', recruiterOrAbove, (req, res) => res.json({ success: true, message: 'Parse resume - To be implemented' }));

export default router;