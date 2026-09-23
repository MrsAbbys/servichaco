import pool from '../config/db.js';

export const getPublicServices = async (req, res) => {
  try {
    const { category, is_24_7 } = req.query;
    let queryText = `
      SELECT id, name, category, description, address, 
             latitude, longitude, whatsapp, is_24_7, is_verified 
      FROM businesses 
      WHERE 1=1
    `;
    const queryParams = [];

    if (category) {
      queryParams.push(category);
      queryText += ` AND category = $${queryParams.length}`;
    }

    if (is_24_7 === 'true') {
      queryText += ` AND is_24_7 = TRUE`;
    }

    queryText += ` ORDER BY name ASC`;

    const { rows } = await pool.query(queryText, queryParams);
    
    return res.status(200).json({
      success: true,
      total: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('❌ Error al consultar servicios:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor al consultar servicios'
    });
  }
};

export const getBusinessesDirectory = async (req, res) => {
  try {
    const { category, search } = req.query;
    let queryText = `
      SELECT id, name, category, description, address, 
             latitude, longitude, whatsapp, is_verified, created_at
      FROM businesses 
      WHERE 1=1
    `;
    const queryParams = [];

    if (category) {
      queryParams.push(category);
      queryText += ` AND category = $${queryParams.length}`;
    }

    if (search) {
      queryParams.push(`%${search.toLowerCase()}%`);
      queryText += ` AND (LOWER(name) LIKE $${queryParams.length} OR LOWER(description) LIKE $${queryParams.length})`;
    }

    queryText += ` ORDER BY is_verified DESC, name ASC`;

    const { rows } = await pool.query(queryText, queryParams);
    return res.status(200).json({
      success: true,
      total: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('❌ Error al consultar directorio comercial:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error interno al consultar comercios'
    });
  }
};
