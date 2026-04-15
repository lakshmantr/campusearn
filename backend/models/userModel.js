const bcrypt = require('bcryptjs');
const db = require('../db');

const SALT_ROUNDS = 10;

async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function createUser({ name, email, password, role }) {
  const passwordHash = await hashPassword(password);
  const text = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role;
  `;
  const values = [name, email, passwordHash, role];
  const result = await db.query(text, values);
  return result.rows[0];
}

async function findUserByEmail(email) {
  const text = 'SELECT * FROM users WHERE email = $1 LIMIT 1';
  const result = await db.query(text, [email]);
  return result.rows[0];
}

async function findUserById(id) {
  const text = 'SELECT id, name, email, role FROM users WHERE id = $1 LIMIT 1';
  const result = await db.query(text, [id]);
  return result.rows[0];
}

async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  verifyPassword,
};
