const express = require('express');
const cors = require('cors');
const apiCache = require('apicache');

dotenv = require('dotenv').config();

const PORT = process.env.PORT || 5000;

const cache = apiCache.middleware;

const app = express();

app.use(cors());

app.use('/api/v1', cache('5 minutes'), require('./routes'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
