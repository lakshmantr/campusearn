const express = require('express');
const {
  submitApplication,
  getApplications,
  updateApplicationStatus,
} = require('../controllers/applicationController');
const { authGuard, requireRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authGuard, requireRole('student'), submitApplication);
router.get('/', authGuard, getApplications);
router.put('/:id/status', authGuard, requireRole('employer'), updateApplicationStatus);

module.exports = router;
