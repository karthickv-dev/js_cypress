const dotenv = require('dotenv');
const express = require('express');

// Load environment-specific variables
const environment = process.env.NODE_ENV || 'production';
dotenv.config({ path: `.env.${environment}` });

// Configure your application
const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const API_URL = process.env.API_URL;

// Example route
app.get('/', (req, res) => {
  res.send(`Environment: ${environment}<br>Database URL: ${DATABASE_URL}<br>API URL: ${API_URL}`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
