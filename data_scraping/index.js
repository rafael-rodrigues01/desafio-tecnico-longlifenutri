// realiza as importações necessárias
import express from 'express';
import route from './routes.js';
import cors from 'cors';

// cria uma instância do express
const app = express();

//usa o cors para permitir requisições de outros domínios
app.use(cors());

// usa o express.json() para analisar o corpo das requisições como JSON
app.use(express.json());

// usa o route para definir as rotas e manter a organização do código
app.use(route);

// define a porta do servidor
const PORT = 3000;

// inicia o servidor na porta definida
app.listen(PORT, () => {
  console.log(`Server is running at port: http://localhost:${PORT}`);
});
