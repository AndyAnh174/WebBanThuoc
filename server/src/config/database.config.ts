import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  url: process.env.DATABASE_URL,
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  user: process.env.POSTGRES_USER || 'admin',
  password: process.env.POSTGRES_PASSWORD || 'admin123',
  database: process.env.POSTGRES_DB || 'webbanthuoc',
}));
