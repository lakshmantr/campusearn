const db = require('../db');

async function createJob({ title, description, pay, location, employer_id }) {
  const text = `
    INSERT INTO jobs (title, description, pay, location, employer_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [title, description, pay, location, employer_id];
  const result = await db.query(text, values);
  return result.rows[0];
}

async function getJobById(id) {
  const text = `
    SELECT j.*, u.name AS employer_name, u.email AS employer_email
    FROM jobs j
    JOIN users u ON j.employer_id = u.id
    WHERE j.id = $1
    LIMIT 1;
  `;
  const result = await db.query(text, [id]);
  return result.rows[0];
}

async function getJobs(filters = {}) {
  const conditions = [];
  const values = [];

  if (filters.search) {
    values.push(`%${filters.search}%`);
    conditions.push(`(j.title ILIKE $${values.length} OR j.description ILIKE $${values.length})`);
  }

  if (filters.location) {
    values.push(`%${filters.location}%`);
    conditions.push(`j.location ILIKE $${values.length}`);
  }

  if (filters.minPay) {
    values.push(filters.minPay);
    conditions.push(`j.pay >= $${values.length}`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const text = `
    SELECT j.*, u.name AS employer_name
    FROM jobs j
    JOIN users u ON j.employer_id = u.id
    ${whereClause}
    ORDER BY j.created_at DESC;
  `;

  const result = await db.query(text, values);
  return result.rows;
}

module.exports = {
  createJob,
  getJobById,
  getJobs,
};
