const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require("cors");

const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute')

mongoose.connect(process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to DB!'));

const app = express();

// Middlewares
app.use(express.json());
app.use(logger("dev"));
app.use(
  cors({
    origin: process.env.APP_DOMAIN,
    credentials: true
  })
);

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Catch 404 Errors and forward then to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = process.env.NODE_ENV === 'development' ? err : {};
  const status = err.status || 500;

  res.status(status).json({
    error: {
      message: error.message
    }
  });

  console.error(error);
});

module.exports = app;
