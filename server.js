require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { authGuard, requireRole } = require('./middleware/auth'); 
const apiRouter = require('./routes'); 

const app = express();

// --- 1. CORS CONFIG (MUST BE AT THE VERY TOP) ---
const allowedOrigins = [
  "http://localhost:5173",
  "https://campusearnlm.vercel.app",
  "https://campusearn.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow internal requests or tools like Postman (no origin)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      // This tells the browser: "I allow exactly the URL you are currently on"
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// --- 2. MIDDLEWARES ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- 3. ROUTES ---
// Public Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CampusEarn backend is active' });
});

// Main API Routes (where your /jobs and /auth/register live)
app.use('/api', apiRouter);

// --- 4. ERROR HANDLING ---
app.use((err, req, res, next) => {
  console.error("Error Logged:", err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// --- 5. SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
