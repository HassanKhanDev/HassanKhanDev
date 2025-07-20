import express from 'express';
import { protect, hrOrAdmin } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);

router.post('/generate-offer-letter', hrOrAdmin, (req, res) => res.json({ success: true, message: 'Generate offer letter - To be implemented' }));
router.post('/generate-warning', hrOrAdmin, (req, res) => res.json({ success: true, message: 'Generate warning letter - To be implemented' }));
router.get('/my-documents', (req, res) => res.json({ success: true, message: 'My documents - To be implemented' }));
router.post('/upload', (req, res) => res.json({ success: true, message: 'Upload document - To be implemented' }));

export default router;