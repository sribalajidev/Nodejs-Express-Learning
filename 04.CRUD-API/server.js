// server.js

const express = require('express');


const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Import routes & concepts
const basicRoutes = require('./routes/basicRoutes');
const restApiRoutes = require('./concepts/rest-api-principles');
const crudRoutes = require('./concepts/crud');
const jsonStatus = require('./concepts/jsonStatus');

app.use('/', basicRoutes); // This will render the routes from basicRoutes 

app.use('/api/concepts', restApiRoutes); // This will render the routes from rest-api-principles

app.use('/api/concepts', crudRoutes); // This will render the routes from crud.js

app.use('/api/concepts', jsonStatus); // This will render the routes from jsonStatus.js

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});