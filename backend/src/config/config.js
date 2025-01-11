import dotenv from 'dotenv';

dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 9000,
  mongoUrl: process.env.MONGODB_URI || 'mongodb://root:root@mongo_db:27017/expensetracker'
};

export default config;