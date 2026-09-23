import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.POSTGRES_USER || 'servichaco_admin',
  password: process.env.POSTGRES_PASSWORD || 'servichaco_secret_2026',
  database: process.env.POSTGRES_DB || 'servichaco_db',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('connect', () => {
  console.log('📦 [PostgreSQL]: Pool conectado exitosamente');
});

pool.on('error', (err) => {
  console.error('❌ [PostgreSQL]: Error en el pool:', err);
});

export default pool;
