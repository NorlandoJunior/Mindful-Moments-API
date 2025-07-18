const dotenv = require('dotenv');
// Load env variables
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to DB
connectDB();

// Create app instance
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const entryRoutes = require('./routes/entries');

app.use('/api/auth', authRoutes);
app.use('/api/entries', entryRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Mindful Moments API is running 🌿');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
