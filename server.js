require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const { authGuard, requireRole } = require('./middleware/auth'); // Path to the code you shared
const apiRouter = require('./routes'); 

const app = express();

// 1. MUST BE FIRST: CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://campusearnlm.vercel.app",
  "https://campusearn.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// 2. Request Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Health Check (Public)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'CampusEarn backend is running',
    timestamp: new Date().toISOString()
  });
});

// 4. Example: How to use your middleware on specific routes
// This route is protected: only logged-in Admins can see it
app.get('/api/admin-only', authGuard, requireRole('admin'), (req, res) => {
  res.json({ message: `Hello Admin ${req.auth.email}, you have access.` });
});

// 5. Main API Routes
app.use('/api', apiRouter);

// 6. 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// 7. Global Error Handler
app.use((err, req, res, next) => {
  console.error('SERVER_ERROR:', err.stack);
  
  // Handle CORS errors specifically
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS policy blocked this request' });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
  🚀 CampusEarn Backend ready!
  📡 Port: ${PORT}
  🔗 Allowed Origins: ${allowedOrigins.join(', ')}
  `);
});
