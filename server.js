const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./utils/db');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const verifyToken = require('./middleware/authMiddleware');
const courseRoutes = require('./routes/courseRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const searchRoutes = require('./routes/searchRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', verifyToken,courseRoutes);
app.use('/api/lessons', verifyToken,lessonRoutes);
app.use('/api', searchRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Connect to the database and start the server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
