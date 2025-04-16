import express from 'express';
import cors from 'cors';
import usuarioRoutes from './src/routes/usuarioRoutes';
import { AppDataSource } from './src/config/database';
import { setupSwagger } from './src/swagger';
import * as net from 'net';

const app = express();
const DEFAULT_PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Inicializa o banco
AppDataSource.initialize()
  .then(() => {
    console.log('Banco de dados conectado com sucesso');
  })
  .catch((error) => console.log('Erro ao conectar no banco de dados:', error));

// Rotas
app.use('/Antedeguemon', usuarioRoutes);
setupSwagger(app);

// Verifica porta disponível manualmente
function getAvailablePort(startingPort: number): Promise<number> {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(startingPort, () => {
      server.once('close', () => resolve(startingPort));
      server.close();
    });
    server.on('error', () => {
      // Porta ocupada, tenta a próxima
      resolve(getAvailablePort(startingPort + 1));
    });
  });
}

// Start do servidor
(async () => {
  const port = await getAvailablePort(DEFAULT_PORT);
  app.listen(port, () => {
    console.log(` Servidor rodando na porta ${port}`);
    console.log(` Documentação disponível em http://localhost:${port}/docs`);
  });
})();
