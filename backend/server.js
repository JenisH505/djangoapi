const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./routers/routes');
const cors = require('cors');

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 9000;

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/realestate", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected successfully");
}).catch(err => {
  console.error("MongoDB connection error:", err);
  process.exit(1); // Exit process with failure
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
