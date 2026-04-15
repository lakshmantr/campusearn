const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const url = new URL(connectionString);

const pool = new Pool({
  user: url.username,
  password: url.password,
  host: url.hostname,
  port: 5432,
  database: url.pathname.slice(1),
  ssl: {
    rejectUnauthorized: false
  },
  options: '-c inet_family=4'
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
