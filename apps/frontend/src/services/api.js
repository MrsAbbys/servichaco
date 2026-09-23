const API_URL = 'http://localhost:4000/api/v1';

export const fetchPublicServices = async (category = '', is247 = false) => {
  try {
    let url = `${API_URL}/services/public?`;
    if (category) url += `category=${category}&`;
    if (is247) url += `is_24_7=true&`;

    const res = await fetch(url);
    if (!res.ok) throw new Error('Error al consultar servicios');
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};

export const fetchMobilityRoutes = async () => {
  try {
    const res = await fetch('http://localhost:4001/api/v1/mobility/routes');
    if (!res.ok) throw new Error('Error al consultar rutas de movilidad');
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Mobility API Error:', error);
    return [];
  }
};

export const sendChatMessage = async (message) => {
  try {
    const res = await fetch('http://localhost:5000/api/v1/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    if (!res.ok) throw new Error('Error al consultar el asistente');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Chat API Error:', error);
    return {
      agent: 'Error',
      reply: 'No se pudo comunicar con los servicios de ServiChaco en este momento.'
    };
  }
};

export const fetchBusinessesDirectory = async (category = '', search = '') => {
  try {
    let url = `${API_URL}/services/directory?`;
    if (category) url += `category=${category}&`;
    if (search) url += `search=${encodeURIComponent(search)}&`;

    const res = await fetch(url);
    if (!res.ok) throw new Error('Error al consultar directorio comercial');
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Directory API Error:', error);
    return [];
  }
};
