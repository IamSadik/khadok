const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const mysql = require('mysql');
const pool = require('./config/configdb');
const authRoutes = require('./routes/authRoutes');

// Initialize dotenv for environment variables
dotenv.config();

const app = express();




// Middleware
app.use(cors({
  origin: 'https://your-frontend-url.com',
  methods: 'GET,POST,PUT,DELETE',
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const consumerRoutes = require('./routes/consumerRoutes');
app.use('/', consumerRoutes);

// Routes
//app.use('/api/admin', require('./routes/adminRoutes'));
//app.use('/api/consumer', require('./routes/consumerRoutes'));
//app.use('/api/restaurant', require('./routes/restaurantRoutes'));
//app.use('/api/rider', require('./routes/riderRoutes'));
//app.use('/api/order', require('./routes/orderRoutes'));


// Home route
app.get('/', (req, res) => {
  res.send('Welcome to Khadok Food Delivery!');
});



// Database connection check
pool.getConnection((err) => {
  if (err) {
      console.error("Database connection failed:", err);
      process.exit(1);
  } else {
      console.log("Database connected!");
  }
});

// Set up the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
console.log("Auth routes loaded.");
