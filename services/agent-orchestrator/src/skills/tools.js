const CORE_API_URL = process.env.CORE_API_URL || 'http://127.0.0.1:4000/api/v1';
const MOBILITY_URL = process.env.MOBILITY_URL || 'http://127.0.0.1:4001/api/v1';
const RAG_URL = process.env.RAG_URL || 'http://127.0.0.1:8000/api/v1';

export async function skill_find_emergency(category = '', is247 = true) {
  try {
    const res = await fetch(`${CORE_API_URL}/services/public?category=${category}&is_24_7=${is247}`);
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error('Error en skill_find_emergency:', err.message);
    return [];
  }
}

export async function skill_mobility_routes() {
  try {
    const res = await fetch(`${MOBILITY_URL}/mobility/routes`);
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error('Error en skill_mobility_routes:', err.message);
    return [];
  }
}

export async function skill_rag_documental(query) {
  try {
    const res = await fetch(`${RAG_URL}/rag/retrieve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, top_k: 2 })
    });
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error('Error en skill_rag_documental:', err.message);
    return [];
  }
}
