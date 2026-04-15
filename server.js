const express = require('express');
const cors = require('cors');
const { PORT, CORS_ORIGIN } = require('./config');
const apiRouter = require('./routes');

const app = express();

// Enable JSON parsing for incoming requests
app.use(express.json());

// Enable CORS for the frontend application
app.use(
  cors({
    origin: "https://campusearnlm.vercel.app",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  }),
);

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CampusEarn backend is running' });
});

// Main API router
app.use('/api', apiRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const port = PORT || 5000;
app.listen(port, () => {
  console.log(`CampusEarn backend listening on port ${port}`);
});
