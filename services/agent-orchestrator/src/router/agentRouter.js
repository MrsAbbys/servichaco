import { skill_find_emergency, skill_mobility_routes, skill_rag_documental } from '../skills/tools.js';

export async function processUserMessage(userMessage) {
  const normalized = userMessage.toLowerCase();

  // 1. Prioridad: Consultas normativas, tarifas, ordenanzas, costos o regulaciones -> RAG
  if (
    normalized.includes('tarifa') ||
    normalized.includes('precio') ||
    normalized.includes('cuanto') ||
    normalized.includes('ordenanza') ||
    normalized.includes('regula') ||
    normalized.includes('estudiante')
  ) {
    const ragContext = await skill_rag_documental(userMessage);
    if (ragContext.length > 0 && ragContext[0].score > 0.35) {
      return {
        agent: 'Agente Experto Documental (RAG)',
        action: 'skill_rag_documental',
        reply: 'De acuerdo con la normativa y ordenanzas locales de Yacuiba:',
        contextSnippet: ragContext[0].text,
        source: ragContext[0].source_file,
        confidence: ragContext[0].score
      };
    }
  }

  // 2. Intención: Servicios de urgencia / Salud / Farmacias
  if (
    normalized.includes('farmacia') ||
    normalized.includes('hospital') ||
    normalized.includes('urgencia') ||
    normalized.includes('emergencia')
  ) {
    const category = normalized.includes('farmacia') ? 'farmacia' : normalized.includes('hospital') ? 'salud' : '';
    const results = await skill_find_emergency(category, true);
    return {
      agent: 'Agente Cívico de Servicios',
      action: 'skill_find_emergency',
      reply: results.length > 0 
        ? `Encontré ${results.length} servicio(s) 24/7 disponible(s) en Yacuiba:`
        : 'No encontré servicios de emergencia registrados para ese criterio.',
      payload: results
    };
  }

  // 3. Intención: Trazado de rutas y paradas de transporte
  if (
    normalized.includes('micro') ||
    normalized.includes('trufi') ||
    normalized.includes('ruta') ||
    normalized.includes('parada') ||
    normalized.includes('linea')
  ) {
    const routes = await skill_mobility_routes();
    return {
      agent: 'Agente de Movilidad Yacuiba Móvil',
      action: 'skill_mobility_routes',
      reply: `Se tienen registradas ${routes.length} rutas principales en Yacuiba:`,
      payload: routes
    };
  }

  // 4. Fallback general: intentar búsqueda RAG abierta
  const generalRag = await skill_rag_documental(userMessage);
  if (generalRag.length > 0 && generalRag[0].score > 0.40) {
    return {
      agent: 'Agente Experto Documental (RAG)',
      action: 'skill_rag_documental',
      reply: 'Información encontrada en la base documental de Yacuiba:',
      contextSnippet: generalRag[0].text,
      source: generalRag[0].source_file,
      confidence: generalRag[0].score
    };
  }

  return {
    agent: 'Agente Asistente ServiChaco',
    action: 'general_fallback',
    reply: 'Puedo ayudarte a buscar farmacias de turno, rutas de transporte o normativas municipales de Yacuiba. ¿Sobre qué tema deseas consultar?'
  };
}
