// Import required modules
const express = require('express');
const redis = require('redis');
const mongoose = require('mongoose');

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;

// Connect to Redis
const redisClient = redis.createClient({
  host: 'localhost', // Your Redis server host
  port: 6379,        // Your Redis server port
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
