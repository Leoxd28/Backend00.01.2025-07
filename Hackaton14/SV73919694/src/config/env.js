import 'dotenv/config';

export const env = {
NODE_ENV: process.env.NODE_ENV ?? 'development',
PORT: Number(process.env.PORT ?? 3000),
SESSION_SECRET: process.env.SESSION_SECRET,
JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
ACCESS_TTL: process.env.ACCESS_TTL ?? '10m',
REFRESH_TTL: process.env.REFRESH_TTL ?? '7d',
CSRF_SECRET: process.env.CSRF_SECRET ?? 'csrf-secret',
CORS_ORIGIN: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
IS_PROD: (process.env.NODE_ENV === 'production')
};