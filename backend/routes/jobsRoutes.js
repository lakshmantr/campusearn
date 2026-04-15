const express = require('express');
const { listJobs, getJob, createJob } = require('../controllers/jobController');
const { authGuard, requireRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', listJobs);
router.get('/:id', getJob);
router.post('/', authGuard, requireRole('employer'), createJob);

module.exports = router;
