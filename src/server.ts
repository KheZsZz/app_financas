import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from '@/routes'; // Importa o index.ts da pasta routes
import { errorHandler } from '@/middlewares/errorHandle';

const app = express();

app.use(cors());
app.use(express.json());

// Todas as rotas agora prefixadas conforme definido no routes/index.ts
app.use('/api', routes); 

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}/api`);
});