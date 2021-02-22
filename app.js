const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to DB!'));

const app = express();

const users = require('./routes/userRoute');
const auth = require('./routes/authRoute');

// Middlewares
app.use(express.json());
app.use(logger('dev'));

// Routes
app.use('/auth', auth);
app.use('/users', users);

// Catch 404 Errors and forward then to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  res.status(status).json({
    error: {
      message: error.message
    }
  });

  console.error(error);
});

// Start the server
const port = app.get('port') || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));