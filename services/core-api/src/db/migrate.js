import pool from '../config/db.js';

async function runMigrations() {
  const queryText = `
    -- Extensiones
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE EXTENSION IF NOT EXISTS vector;

    -- Tabla de Usuarios y Roles
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(100) NOT NULL,
      email VARCHAR(120) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      role VARCHAR(20) DEFAULT 'ciudadano' CHECK (role IN ('visitante', 'ciudadano', 'comerciante', 'chofer', 'admin')),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabla de Comercios y Servicios 24/7
    CREATE TABLE IF NOT EXISTS businesses (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES users(id) ON DELETE SET NULL,
      name VARCHAR(150) NOT NULL,
      category VARCHAR(50) NOT NULL,
      description TEXT,
      address TEXT,
      latitude NUMERIC(10, 7),
      longitude NUMERIC(10, 7),
      whatsapp VARCHAR(20),
      is_24_7 BOOLEAN DEFAULT FALSE,
      is_verified BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabla de Reportes Ciudadanos
    CREATE TABLE IF NOT EXISTS citizen_reports (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES users(id) ON DELETE SET NULL,
      title VARCHAR(150) NOT NULL,
      category VARCHAR(50) NOT NULL,
      description TEXT NOT NULL,
      latitude NUMERIC(10, 7) NOT NULL,
      longitude NUMERIC(10, 7) NOT NULL,
      photo_url TEXT,
      status VARCHAR(20) DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'en_revision', 'resuelto')),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    console.log('🔄 Ejecutando migraciones SQL en PostgreSQL...');
    await pool.query(queryText);
    console.log(' Tablas creadas satisfactoriamente.');
  } catch (error) {
    console.error('❌ Error ejecutando migraciones:', error.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

runMigrations();
