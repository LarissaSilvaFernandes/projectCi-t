const { sequelize, initDb } = require('./database/migration');
const createServer = require('./server');

(async () => {
  try {
    await initDb(); // Inicializar banco de dados e dados de teste
    await sequelize.authenticate();
    console.log('Database connected and initialized.');

    const server = createServer();
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
})();
