const express = require('express');
const authRoutes = require('./authRoutes');
const jobsRoutes = require('./jobsRoutes');
const applicationsRoutes = require('./applicationsRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/jobs', jobsRoutes);
router.use('/applications', applicationsRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'CampusEarn API root' });
});

module.exports = router;
