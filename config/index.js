const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL || '',
  JWT_SECRET: process.env.JWT_SECRET || 'change-me',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  DB_SSL: process.env.DB_SSL === 'true',
};
