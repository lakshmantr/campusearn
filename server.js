require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { authGuard, requireRole } = require('./middleware/auth'); 
const apiRouter = require('./routes'); 

const app = express();

// 1. DYNAMIC CORS (Fixes the "not equal to supplied origin" error)
const allowedOrigins = [
  "http://localhost:5173",
  "https://campusearnlm.vercel.app",
  "https://campusearn.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true); // This dynamically sets Access-Control-Allow-Origin to the requester's URL
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// 2. Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// 4. API Routes
app.use('/api', apiRouter);

// 5. Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
