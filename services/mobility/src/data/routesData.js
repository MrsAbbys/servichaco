export const publicRoutes = [
  {
    id: "linea-1-pocitos",
    name: "Línea 1 - Interurbano Pocitos",
    type: "micro",
    color: "#059669", // Verde
    schedule: "05:30 - 21:00",
    frequencyMinutes: 10,
    fareBob: 2.00,
    stops: [
      "Mercado Campesino",
      "Rotonda San Gerónimo",
      "Terminal de Buses",
      "Plaza 12 de Agosto",
      "Puente Internacional (San José de Pocitos)"
    ],
    geojson: {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [-63.6825, -22.0080], // Mercado Campesino
          [-63.6800, -22.0110], // Rotonda
          [-63.6775, -22.0139], // Plaza 12 de Agosto
          [-63.6810, -22.0250], // Ruta sur
          [-63.6830, -22.0520]  // San José de Pocitos / Frontera
        ]
      },
      properties: {
        name: "Ruta 1: Mercado - Frontera"
      }
    }
  },
  {
    id: "linea-2-petrolero",
    name: "Línea 2 - Circuito Hospital / Petrolero",
    type: "trufi",
    color: "#d97706", // Ámbar
    schedule: "06:00 - 22:00",
    frequencyMinutes: 7,
    fareBob: 2.50,
    stops: [
      "Hospital Rubén Zelaya",
      "Av. San Martín",
      "Plaza Principal",
      "Barrio Petrolero",
      "Cancha Ferroviaria"
    ],
    geojson: {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [-63.6754, -22.0118], // Hospital Rubén Zelaya
          [-63.6775, -22.0139], // Plaza Principal
          [-63.6720, -22.0180], // Barrio Petrolero
          [-63.6690, -22.0210]  // Complejo Deportivo
        ]
      },
      properties: {
        name: "Ruta 2: Hospital - Petrolero"
      }
    }
  }
];
