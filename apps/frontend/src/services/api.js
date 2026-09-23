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
