require('dotenv').config();

const { dbConnection } = require('./database/config');

dbConnection();

const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
