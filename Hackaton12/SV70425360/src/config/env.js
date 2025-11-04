export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: parseInt(process.env.PORT || '3000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development'
};
