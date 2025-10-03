// server.js
const express = require("express");
const app = express();
const routes = require("./routes"); // auto-load index.js

app.use(express.json());

// mount all concept routes
app.use("/concepts", routes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
