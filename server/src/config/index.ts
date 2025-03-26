import dotenv from 'dotenv';

// Load env variables
dotenv.config();

export default {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/wiki-esi-2027',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  nodeEnv: process.env.NODE_ENV || 'development'
}; 