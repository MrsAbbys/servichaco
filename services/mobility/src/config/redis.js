import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}`
});

redisClient.on('error', (err) => console.error('❌ [Redis Error]:', err.message));
redisClient.on('connect', () => console.log('⚡ [Redis]: Conectado para telemetría de movilidad'));

await redisClient.connect();

export default redisClient;
