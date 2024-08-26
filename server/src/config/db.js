const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const DB_URL = process.env.DB_URL;
module.exports = mongoose
  .connect(DB_URL)
  .then(() => console.log('Database Connected Successfully'))
  .catch((error) => console.log('Error in the DB connection' + error));
