import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from '@/routes'; 
import { errorHandler } from '@/middlewares/errorHandle'; 
import { supabase } from '@/config/supabase';


const app = express();

app.use(cors());
app.use(express.json());

// Todas as rotas agora prefixadas conforme definido no routes/index.ts
app.use('/api', routes); 

app.use(errorHandler);


  async function getTestToken() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'teste@gmail.com',
      password: 'Admin@2026',
    });

    if (error) {
      console.error('Erro ao logar:', error.message);
      return;
    }

    console.log('--- SEU TOKEN DE ACESSO ---');
    console.log(data.session?.access_token);
    console.log('---------------------------');
  }

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}/api`);

  getTestToken();
});