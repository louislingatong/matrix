const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
    console.log('Connected to DB!')
    if (process.env.NODE_ENV === 'development' || 'dev') {
      /** Execute seeder */
    }
  } catch (err) {

  }
}

module.exports = dbConnect;