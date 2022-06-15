const express = require('express');
const cors = require('cors');

dotenv = require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use('/api/v1', require('./routes'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
