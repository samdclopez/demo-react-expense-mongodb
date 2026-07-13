import dotenv from 'dotenv';

dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 9090,
  mongoUrl: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/expensetracker'
};

export default config;