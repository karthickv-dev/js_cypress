// app.js
const express = require('express');
const bodyParser = require('body-parser');
const handleResponse = require('./commonHandler');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Endpoint for Service 1
app.post('/service1', (req, res) => {
  try {
    const response = req.body;
    const output = handleResponse(response, 'service1');
    res.json({ result: output });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint for Service 2
app.post('/service2', (req, res) => {
  try {
    const response = req.body;
    const output = handleResponse(response, 'service2');
    res.json({ result: output });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
