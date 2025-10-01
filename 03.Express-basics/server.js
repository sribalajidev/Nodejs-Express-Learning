// server.js

const express = require('express');
const morgan = require('morgan'); // import third-party middleware
const bodyParser = require('body-parser'); // body-parser (optional, legacy style)


const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request body
app.use(express.json());

// Instead of app.use(express.json()) for body-parser;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Third-party middleware (logs each request in "dev" format)
app.use(morgan('dev'));

// Import routes & concepts
const basicRoutes = require('./routes/basicRoutes');
const reqResRoutes = require('./concepts/reqRes');
const routingRoutes = require('./routes/conceptsRoutes');
const middlewareExample = require('./concepts/middleware');

app.use('/', basicRoutes); // This will render the routes from basicRoutes 

app.use('/api/concepts', reqResRoutes); // This will render the routes from concepts - reqRes.js 

app.use('/api/routing', routingRoutes); // This will render the routes from conceptsRoutes.js

app.use('/api/middleware', middlewareExample); // This will render the routes from middleware.js

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});