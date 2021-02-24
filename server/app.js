const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to DB!'));

const app = express();

// Middlewares
app.use(express.json());
app.use(logger("dev"));

// Routes
app.use('/auth', require('./routes/authRoute'));
app.use('/users', require('./routes/userRoute'));

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