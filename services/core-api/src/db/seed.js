import pool from '../config/db.js';

async function seedData() {
  const seedQuery = `
    INSERT INTO businesses (name, category, description, address, latitude, longitude, whatsapp, is_24_7, is_verified)
    VALUES
      (
        'Farmacia San Roque (De Turno)',
        'farmacia',
        'Atención 24 horas y despacho de medicamentos esenciales.',
        'Calle Campero entre San Martín y Comercio, Yacuiba',
        -22.0145000,
        -63.6782000,
        '59171234567',
        TRUE,
        TRUE
      ),
      (
        'Hospital Rubén Zelaya',
        'salud',
        'Centro hospitalario principal y emergencias médicas 24/7.',
        'Av. San Martín esquina Calle Ballivián, Yacuiba',
        -22.0118000,
        -63.6754000,
        '59168901234',
        TRUE,
        TRUE
      ),
      (
        'Taller Mecánico El Chaqueño',
        'taller',
        'Auxilio mecánico, gomería y mantenimiento de vehículos livianos y pesados.',
        'Ruta 9 km 2, Salida a Santa Cruz, Yacuiba',
        -22.0021000,
        -63.6812000,
        '59172345678',
        FALSE,
        TRUE
      ),
      (
        'Comercial y Electrónica Frontera',
        'comercio',
        'Venta de accesorios, periféricos y soporte técnico para equipos.',
        'Calle Comercio esquina Crevaux, Yacuiba',
        -22.0162000,
        -63.6791000,
        '59174567890',
        FALSE,
        TRUE
      ),
      (
        'Radio Móvil El Obelisco',
        'transporte',
        'Servicio de radiotaxi y traslados seguros al puente internacional.',
        'Plaza Principal 12 de Agosto, Yacuiba',
        -22.0139000,
        -63.6775000,
        '59173456789',
        TRUE,
        TRUE
      )
    ON CONFLICT DO NOTHING;
  `;

  try {
    console.log('🌱 Insertando datos semilla para Yacuiba...');
    await pool.query(seedQuery);
    console.log(' Datos semilla insertados correctamente.');
  } catch (error) {
    console.error('❌ Error al sembrar datos:', error.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

seedData();
