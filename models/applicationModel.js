const db = require('../db');

async function createApplication({ student_id, job_id }) {
  const text = `
    INSERT INTO applications (student_id, job_id, status)
    VALUES ($1, $2, 'pending')
    RETURNING *;
  `;
  const values = [student_id, job_id];
  const result = await db.query(text, values);
  return result.rows[0];
}

async function getApplicationsByStudent(student_id) {
  const text = `
    SELECT a.*, j.title AS job_title, j.pay AS job_pay, j.location AS job_location,
      u.name AS employer_name
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    JOIN users u ON j.employer_id = u.id
    WHERE a.student_id = $1
    ORDER BY a.created_at DESC;
  `;
  const result = await db.query(text, [student_id]);
  return result.rows;
}

async function getApplicationsByEmployer(employer_id) {
  const text = `
    SELECT a.*, j.title AS job_title, s.name AS student_name, s.email AS student_email
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    JOIN users s ON a.student_id = s.id
    WHERE j.employer_id = $1
    ORDER BY a.created_at DESC;
  `;
  const result = await db.query(text, [employer_id]);
  return result.rows;
}

async function getApplicationById(id) {
  const text = 'SELECT * FROM applications WHERE id = $1 LIMIT 1';
  const result = await db.query(text, [id]);
  return result.rows[0];
}

async function updateApplicationStatus(id, status) {
  const text = `
    UPDATE applications
    SET status = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING *;
  `;
  const result = await db.query(text, [status, id]);
  return result.rows[0];
}

module.exports = {
  createApplication,
  getApplicationsByStudent,
  getApplicationsByEmployer,
  getApplicationById,
  updateApplicationStatus,
};
