const applicationModel = require('../models/applicationModel');
const jobModel = require('../models/jobModel');
const db = require('../db');

async function submitApplication(req, res, next) {
  try {
    const student_id = req.auth.userId;
    const { job_id } = req.body;

    if (!job_id) {
      return res.status(400).json({ error: 'job_id is required.' });
    }

    const job = await jobModel.getJobById(job_id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found.' });
    }

    if (job.employer_id === student_id) {
      return res.status(403).json({ error: 'Employers cannot apply to their own jobs.' });
    }

    const duplicateQuery = 'SELECT 1 FROM applications WHERE student_id = $1 AND job_id = $2 LIMIT 1';
    const duplicateResult = await db.query(duplicateQuery, [student_id, job_id]);
    if (duplicateResult.rows.length) {
      return res.status(409).json({ error: 'You have already applied to this job.' });
    }

    const application = await applicationModel.createApplication({ student_id, job_id });
    res.status(201).json({ application });
  } catch (error) {
    next(error);
  }
}

async function getApplications(req, res, next) {
  try {
    const { userId, role } = req.auth;

    if (role === 'student') {
      const applications = await applicationModel.getApplicationsByStudent(userId);
      return res.json({ applications });
    }

    if (role === 'employer') {
      const applications = await applicationModel.getApplicationsByEmployer(userId);
      return res.json({ applications });
    }

    res.status(403).json({ error: 'Invalid user role.' });
  } catch (error) {
    next(error);
  }
}

async function updateApplicationStatus(req, res, next) {
  try {
    const { userId } = req.auth;
    const { id } = req.params;
    const { status } = req.body;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Status must be accepted or rejected.' });
    }

    const application = await applicationModel.getApplicationById(id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found.' });
    }

    const job = await jobModel.getJobById(application.job_id);
    if (!job || job.employer_id !== userId) {
      return res.status(403).json({ error: 'You are not authorized to update this application.' });
    }

    const updatedApplication = await applicationModel.updateApplicationStatus(id, status);
    res.json({ application: updatedApplication });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  submitApplication,
  getApplications,
  updateApplicationStatus,
};
