import express from 'express';
import { protect, hrOrAdmin } from '../middleware/auth.js';

const router = express.Router();

// Apply protection to all routes
router.use(protect);

// @route   GET /api/employees
// @desc    Get all employees
// @access  Private/HR/Admin
router.get('/', hrOrAdmin, (req, res) => {
  res.json({ success: true, message: 'Get employees endpoint - To be implemented' });
});

// @route   GET /api/employees/onboarding
// @desc    Get onboarding queue
// @access  Private/HR/Admin
router.get('/onboarding', hrOrAdmin, (req, res) => {
  res.json({ success: true, message: 'Employee onboarding queue - To be implemented' });
});

// @route   POST /api/employees/:id/onboard
// @desc    Complete employee onboarding
// @access  Private/HR/Admin
router.post('/:id/onboard', hrOrAdmin, (req, res) => {
  res.json({ success: true, message: 'Complete onboarding endpoint - To be implemented' });
});

export default router;