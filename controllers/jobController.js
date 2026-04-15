const jobModel = require('../models/jobModel');

async function listJobs(req, res, next) {
  try {
    const { search, location, minPay } = req.query;
    const filters = {
      search: search || null,
      location: location || null,
      minPay: minPay ? Number(minPay) : null,
    };
    const jobs = await jobModel.getJobs(filters);
    res.json({ jobs });
  } catch (error) {
    next(error);
  }
}

async function getJob(req, res, next) {
  try {
    const job = await jobModel.getJobById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found.' });
    }
    res.json({ job });
  } catch (error) {
    next(error);
  }
}

async function createJob(req, res, next) {
  try {
    const { title, description, pay, location } = req.body;
    if (!title || !description || !pay || !location) {
      return res.status(400).json({ error: 'Title, description, pay, and location are required.' });
    }

    const job = await jobModel.createJob({
      title,
      description,
      pay,
      location,
      employer_id: req.auth.userId,
    });

    res.status(201).json({ job });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listJobs,
  getJob,
  createJob,
};
