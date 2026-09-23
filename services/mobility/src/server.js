import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { WebSocketServer, WebSocket } from 'ws';
import mobilityRoutes from './routes/mobilityRoutes.js';
import redisClient from './config/redis.js';

dotenv.config();

const app = express();
const PORT = process.env.MOBILITY_PORT || 4001;

app.use(cors());
app.use(express.json());

// Endpoints REST
app.use('/api/v1/mobility', mobilityRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', service: 'mobility-service' });
});

// Servidor HTTP híbrido (REST + WS)
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws/tracking' });

wss.on('connection', (ws) => {
  console.log('📡 [WebSocket]: Nuevo cliente conectado a telemetría');

  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);

      // Si el emisor es un chofer/unidad transmitiendo posición:
      // Formato esperado: { type: "TELEMETRY_UPDATE", unitId: "U-102", routeId: "linea-1-pocitos", lat: -22.014, lng: -63.678 }
      if (data.type === 'TELEMETRY_UPDATE') {
        const key = `unit:${data.unitId}`;
        const payload = JSON.stringify({
          unitId: data.unitId,
          routeId: data.routeId,
          lat: data.lat,
          lng: data.lng,
          timestamp: new Date().toISOString()
        });

        // Guardar estado en Redis con expiración de 60 segundos
        await redisClient.set(key, payload, { EX: 60 });

        // Reenviar la posición a todos los clientes (visitantes/ciudadanos)
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(payload);
          }
        });
      }
    } catch (err) {
      console.error('Error procesando mensaje WS:', err.message);
    }
  });

  ws.on('close', () => {
    console.log('🔌 [WebSocket]: Cliente desconectado');
  });
});

server.listen(PORT, () => {
  console.log(`🚀 [Mobility Service]: Escuchando en el puerto ${PORT} (REST & WebSockets)`);
});
