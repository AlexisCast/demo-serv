require('dotenv').config();

const { dbConnection } = require('./database/config');

dbConnection();

const app = require('./app');

const port = process.env.PORT || 3000;

process.on('uncaughtException', (err) => {
  console.log(err);
  console.log('UNCAUGHT REJECTION! Shutting down...');

  process.exit(1);
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLER REJECTION! Shutting down...');

  server.close(() => {
    process.exit(1);
  });
});
