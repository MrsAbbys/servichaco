import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { processUserMessage } from './router/agentRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.AGENT_ORCHESTRATOR_PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/v1/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: 'El mensaje es requerido' });
    }

    const response = await processUserMessage(message);
    return res.status(200).json({ success: true, data: response });
  } catch (err) {
    console.error('Error en chat orquestador:', err.message);
    return res.status(500).json({ success: false, message: 'Error interno en el orquestador agéntico' });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', service: 'agent-orchestrator' });
});

app.listen(PORT, () => {
  console.log(`🚀 [Agent Orchestrator]: Despachando agentes en el puerto ${PORT}`);
});
