# ServiChaco

Plataforma web integral de servicios, comercio, movilidad y participación ciudadana para la ciudad de Yacuiba.

## Arquitectura del Proyecto
- `apps/frontend`: Aplicación cliente (PWA / Modo visitante y ciudadano).
- `services/core-api`: API REST de servicios 24/7, comercio local y reportes urbanos.
- `services/mobility`: Gateway de WebSockets para seguimiento GPS y rutas (Yacuiba Móvil).
- `services/agent-orchestrator`: Motor de agentes inteligentes y despacho de habilidades.
- `services/rag-engine`: Extracción documental con OCR, paralelización de embeddings y búsqueda vectorial.
- `benchmarks/`: Pruebas de impacto computacional de OCR y lotes de embeddings.
- `deploy/docker/`: Contenedores y orquestación con Docker Compose.
