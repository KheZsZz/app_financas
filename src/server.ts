import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from '@/routes'; 
import { errorHandler } from '@/middlewares/errorHandle'; 
import { supabase } from '@/config/supabase';


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes); 
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}/api`);

});