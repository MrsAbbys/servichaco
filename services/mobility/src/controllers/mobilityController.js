import { publicRoutes } from '../data/routesData.js';

export const getRoutes = (req, res) => {
  const { type } = req.query;
  let data = publicRoutes;

  if (type) {
    data = data.filter(r => r.type.toLowerCase() === type.toLowerCase());
  }

  return res.status(200).json({
    success: true,
    total: data.length,
    data
  });
};

export const getRouteById = (req, res) => {
  const { id } = req.params;
  const route = publicRoutes.find(r => r.id === id);

  if (!route) {
    return res.status(404).json({ success: false, message: 'Ruta no encontrada' });
  }

  return res.status(200).json({ success: true, data: route });
};
