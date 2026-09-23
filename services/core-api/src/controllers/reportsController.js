import pool from '../config/db.js';

export const getPublicReports = async (req, res) => {
  try {
    const { category, status } = req.query;
    let queryText = `
      SELECT id, title, category, description, latitude, longitude, photo_url, status, created_at
      FROM citizen_reports
      WHERE 1=1
    `;
    const queryParams = [];

    if (category) {
      queryParams.push(category);
      queryText += ` AND category = $${queryParams.length}`;
    }

    if (status) {
      queryParams.push(status);
      queryText += ` AND status = $${queryParams.length}`;
    }

    queryText += ` ORDER BY created_at DESC LIMIT 50`;

    const { rows } = await pool.query(queryText, queryParams);
    return res.status(200).json({ success: true, total: rows.length, data: rows });
  } catch (error) {
    console.error('❌ Error al obtener reportes:', error.message);
    return res.status(500).json({ success: false, message: 'Error interno al consultar reportes' });
  }
};

export const createReport = async (req, res) => {
  try {
    const { title, category, description, latitude, longitude, photo_url } = req.body;

    if (!title || !category || !description || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
    }

    const queryText = `
      INSERT INTO citizen_reports (title, category, description, latitude, longitude, photo_url, status)
      VALUES ($1, $2, $3, $4, $5, $6, 'pendiente')
      RETURNING id, title, category, description, latitude, longitude, status, created_at
    `;

    const values = [title, category, description, latitude, longitude, photo_url || null];
    const { rows } = await pool.query(queryText, values);

    return res.status(201).json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('❌ Error al crear reporte:', error.message);
    return res.status(500).json({ success: false, message: 'Error interno al guardar reporte' });
  }
};

export const updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pendiente', 'en_revision', 'resuelto'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Estado no válido' });
    }

    const queryText = `
      UPDATE citizen_reports 
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING id, title, category, status, updated_at
    `;
    const { rows } = await pool.query(queryText, [status, id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Reporte no encontrado' });
    }

    return res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('❌ Error al actualizar reporte:', error.message);
    return res.status(500).json({ success: false, message: 'Error interno al actualizar estado' });
  }
};
