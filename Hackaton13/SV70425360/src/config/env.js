export const env = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  API_TOKEN: process.env.API_TOKEN || 'secret',
  API_KEY: process.env.API_KEY || 'abc123',
  RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW || '60000', 10),
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  UPLOAD_DIR: process.env.UPLOAD_DIR || 'uploads',
  MAX_FILE_MB: parseInt(process.env.MAX_FILE_MB || '2', 10)
};
