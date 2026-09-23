import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import servicesRoutes from './routes/servicesRoutes.js';
import reportsRoutes from './routes/reportsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.CORE_API_PORT || 4000;

app.use(cors());
app.use(express.json());

// Endpoints
app.use('/api/v1/services', servicesRoutes);
app.use('/api/v1/reports', reportsRoutes);

// Health check
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
