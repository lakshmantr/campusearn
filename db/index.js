const { Pool } = require('pg');
const { DATABASE_URL, DB_SSL } = require('../config');

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: DB_SSL
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

pool.on('error', (error) => {
  console.error('Unexpected database error', error);
  process.exit(-1);
});

async function query(text, params) {
  return pool.query(text, params);
}

module.exports = {
  query,
  pool,
};
