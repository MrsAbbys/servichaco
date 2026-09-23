import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import servicesRoutes from './routes/servicesRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.CORE_API_PORT || 4000;

app.use(cors());
app.use(express.json());

// Endpoints del Core
app.use('/api/v1/services', servicesRoutes);

// Health check para Docker y monitoreo
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    service: 'core-api', 
    timestamp: new Date().toISOString() 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 [Core API]: Escuchando peticiones en el puerto ${PORT}`);
});
