const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://campusearnlm.vercel.app",
    "https://campusearn.vercel.app"
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));

// Import routes
const apiRouter = require('./routes'); // adjust path if needed

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CampusEarn backend is running' });
});

// Routes
app.use('/api', apiRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Server error'
  });
});

// Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`CampusEarn backend listening on port ${port}`);
});
